"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  deleteObject,
} from "firebase/storage";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app, auth } from "../config/firebase.config";
import { addToast } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
// User data type interface
interface UserType {
  email: string | null;
  uid: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Create auth context
const AuthContext = createContext({});

export const db = getFirestore(app);

// Make auth context available across the app
export const useAuth = () => useContext<any>(AuthContext);

// Create the auth context provider
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Define the constants for user and loading state
  const [user, setUser] = useState<UserType | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const storage = getStorage(app);

  // Update the state depending on auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        console.log({ user });
        getUserDetails(user.uid).then((data) => setUserData(data));
        pathname === "/login" && router.push("/");
      } else {
        setUser(null);
        setUserData(null);
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign up the user
  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login the user
  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = async (email: any) => {
    return await sendPasswordResetEmail(auth, email)
      .then((p) =>
        addToast({
          title: "Password reset email sent successfully ",
          variant: "flat",
          color: "default",
        })
      )
      .catch((err) =>
        addToast({
          title: "Something went wrong " + err.message,
          variant: "flat",
          color: "danger",
        })
      );
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      registerUser(user.uid, {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      addToast({
        title: "Logged in successfully",
        color: "secondary",
        variant: "solid",
      });
      return user;
    } catch (error: any) {
      addToast({
        title: "Something went wrong",
        description: error.message,
        color: "danger",
        variant: "solid",
      });
    }
  };

  // Logout the user
  const logOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const uploadProfilePicture = async (userId: string, file: File) => {
    try {
      const userRef = doc(db, "users", userId);

      // 🔹 Upload new photo
      const storageRef = ref(storage, `profilePictures/${userId}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // 🔹 Update Firestore with the new photo URL
      await updateDoc(userRef, { photoURL: downloadURL });

      return { success: true, photoURL: downloadURL };
    } catch (error: any) {
      console.error("Error uploading profile photo:", error);
      return { success: false, message: error.message };
    }
  };

  const uploadProfilePhoto = async (userId: string, file: File) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      const existingPhotoURL = userDoc.exists()
        ? userDoc.data().photoURL
        : null;

      // If user has an existing photo, delete it
      if (existingPhotoURL) {
        const oldPhotoRef = ref(storage, existingPhotoURL);
        await deleteObject(oldPhotoRef).catch((error) =>
          console.warn("Error deleting old profile photo:", error)
        );
      }

      // Upload new photo
      const newPhotoRef = ref(storage, `profilePictures/${userId}`);
      await uploadBytes(newPhotoRef, file);
      const downloadURL = await getDownloadURL(newPhotoRef);

      // Update Firestore with the new photo URL
      await updateDoc(userRef, { photoURL: downloadURL });

      return { success: true, photoURL: downloadURL };
    } catch (error: any) {
      console.error("Error uploading profile photo:", error);
      return { success: false, message: error.message };
    }
  };

  const updateUserDetails = async (userId: string, updatedData: any) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, updatedData);
      return { success: true };
    } catch (error: any) {
      console.error("Error updating user details:", error);
      return { success: false, message: error.message };
    }
  };

  // 📌 Store User Data in Firestore
  const registerUser = async (userId: string, userData: any) => {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData);
  };

  // 📌 Get User Details from Firestore
  const getUserDetails = async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return userSnap.data(); // Return user data
      } else {
        return null; // User not found
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  // Provide the auth context to children
  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        userData,
        logIn,
        logOut,
        signInWithGoogle,
        resetPassword,
        uploadProfilePicture,
        registerUser,
        getUserDetails,
        uploadProfilePhoto,
        updateUserDetails,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

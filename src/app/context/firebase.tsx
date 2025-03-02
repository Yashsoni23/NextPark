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
} from "firebase/auth";
import { auth } from "../config/firebase.config";
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
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const provider = new GoogleAuthProvider();
  const router = useRouter();
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
        pathname === "/login" && router.push("/");
      } else {
        setUser(null);
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

  // Provide the auth context to children
  return (
    <AuthContext.Provider
      value={{ user, signUp, logIn, logOut, signInWithGoogle }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

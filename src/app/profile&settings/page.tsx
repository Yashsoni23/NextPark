"use client";
import { useState, useEffect } from "react";
import { Input, Button, Card, Avatar, Spinner, Image } from "@heroui/react";
import { useAuth } from "../context/firebase";

const ProfileUpdate = () => {
  const { user, uploadProfilePicture, updateUserDetails, getUserDetails } =
    useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      // Fetch user details on load
      const fetchData = async () => {
        const data = await getUserDetails(user.uid);
        if (data) {
          setName(data.name || "");
          setPhone(data.phone || "");
          setPhotoURL(data.photoURL || "");
        }
      };
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    console.log("Updated photoURL:", photoURL);
  }, [photoURL]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhoto(file);

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPhotoURL(previewURL);
    }
  };

  const handleUpdate = async () => {
    if (!user?.uid) return;
    setLoading(true);

    let newPhotoURL = photoURL;

    if (photo) {
      const response = await uploadProfilePicture(user.uid, photo);

      if (response.success) {
        newPhotoURL = response.photoURL;
        setPhotoURL(newPhotoURL);
      }
    }

    const updatedData = { name, phone, photoURL: newPhotoURL };
    const response = await updateUserDetails(user.uid, updatedData);

    setLoading(false);
    if (response.success) {
      alert("Profile updated successfully!");
    } else {
      alert("Error: " + response.message);
    }
  };

  return (
    <div className="flex max-sm:flex-col gap-5 justify-center items-center min-h-screen  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100/5 via-slate-300/60 to-slate-300/60 p-6">
      <Card className=" p-5 flex flex-col gap-2">
        <Image
          isZoomed
          sizes="xl"
          src={photoURL || "/default-avatar.png"}
          className="w-80 h-80 rounded border object-fit-xl-none"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="upload-photo"
        />
        <label
          htmlFor="upload-photo"
          className="cursor-pointer text-sm text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Upload New Photo
        </label>
      </Card>
      <Card className="p-6 py-12 max-w-lg w-full shadow-lg bg-white rounded-xl">
        <h2 className="text-2xl font-bold text-center text-secondary-600">
          Update Profile
        </h2>

        <div className="flex flex-col items-center gap-4 mt-4">
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <Input
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            type="tel"
          />
          <Input label="Name" value={user?.email} isDisabled />

          <Button
            onPress={handleUpdate}
            className="bg-secondary-600 text-white w-full"
          >
            {loading ? <Spinner size="sm" /> : "Update Profile"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfileUpdate;

"use client";
import { addToast, Button, Input } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useAuth } from "../context/firebase";
import { useRouter } from "next/navigation";

const Login = () => {
  const [isLogin, setIslogin] = useState(true);
  return (
    <div className="flex max-sm:w-full flex-col gap-5 bg-slate-300 shadow-[-5px_5px_2px_rgba(120,40,200,0.6)] justify-center  sm:w-1/2 py-10 rounded-2xl mt-5 max-sm:p-4 sm:pl-20">
      <h1 className="font-bold sm:text-4xl max-sm:text-2xl text-gray-800 flex-col flex">
        Enter Your <p className="text-secondary-500">Email & Password</p>
      </h1>
      <div className="sm:w-2/3 max-sm:w-full flex flex-col ">
        {isLogin ? (
          <LoginAccount setIslogin={setIslogin} />
        ) : (
          <CreateAccount setIslogin={setIslogin} />
        )}
      </div>
    </div>
  );
};

export default Login;

const LoginAccount = ({ setIslogin }: any) => {
  const router = useRouter();
  const firebase = useAuth();
  useEffect(() => {
    firebase?.user && router.push("/");
  }, [firebase?.user, router]);
  return (
    <>
      <div className=" flex flex-col gap-2">
        <Input
          label="Email"
          labelPlacement={"outside"}
          placeholder="Enter your email address"
          type="email"
        />
        <Input
          label="Password"
          labelPlacement={"outside"}
          placeholder="Enter your password "
          type="password"
        />
        <p className="text-sm pb-2 text-right text-secondary-600 hover:text-secondary-600/65 cursor-pointer duration-300 font-bold">
          Forget Password?
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          onPress={() => {
            setIslogin(true);
            console.log(firebase?.user);
          }}
          title="Explore"
          className="w-max px-10 font-bold text-white bg-secondary-600"
        >
          Login <MdOutlineArrowOutward />
        </Button>
        <Button
          onPress={() => setIslogin(false)}
          title="Explore"
          className="w-max px-4 font-bold text-secondary-600 "
          variant="faded"
        >
          Create Account <MdOutlineArrowOutward />
        </Button>
      </div>
      <p className="inline text-sm p-1 text-center">or</p>
      <Button
        onPress={() => firebase?.signInWithGoogle()}
        variant="faded"
        className="w-full px-10 font-bold text-secondary-600"
      >
        <FcGoogle size={25} /> Login with Google
      </Button>
    </>
  );
};
const CreateAccount = ({ setIslogin }: any) => {
  const { signUp, uploadProfilePicture, registerUser } = useAuth();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    photo: null as File | null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    setUserData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await signUp(userData.email, userData.password);
      const userId = userCredential.user.uid;

      let photoURL = "";
      if (userData.photo) {
        photoURL = await uploadProfilePicture(userId, userData.photo);
      }

      await registerUser(userId, { ...userData, photoURL });

      addToast({
        title: "Account created successfully!",
        variant: "flat",
        color: "success",
      });

      setIslogin(true);
    } catch (error: any) {
      addToast({
        title: "Error: " + error.message,
        variant: "flat",
        color: "danger",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Input
          label="Name"
          labelPlacement="outside"
          placeholder="Enter your Name"
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
        <Input
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email address"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <Input
          label="Phone"
          labelPlacement="outside"
          placeholder="Enter your phone number"
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
        />
        <Input
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <Input
          label="Profile Photo"
          labelPlacement="outside"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex pt-4 gap-4">
        <Button
          onPress={handleSignUp}
          className="w-max px-4 font-bold text-white bg-secondary-600"
        >
          Create Account <MdOutlineArrowOutward />
        </Button>
        <Button
          onPress={() => setIslogin(true)}
          variant="faded"
          className="w-max px-10 font-bold text-secondary-600"
        >
          Login <MdOutlineArrowOutward />
        </Button>
      </div>
    </>
  );
};

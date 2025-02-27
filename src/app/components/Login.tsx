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
    <div className="flex  flex-col gap-5 bg-slate-300 shadow-[-5px_5px_2px_rgba(120,40,200,0.6)] justify-center  w-1/2 py-10 rounded-2xl mt-5 pl-20">
      <h1 className="font-bold text-4xl text-gray-800 flex-col flex">
        Enter Your <p className="text-secondary-500">Email & Password</p>
      </h1>
      <div className="w-2/3 flex flex-col ">
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
  return (
    <>
      <div className=" flex flex-col gap-2">
        <Input
          label="Name"
          labelPlacement={"outside"}
          placeholder="Enter your Name "
          type="text"
        />
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
      </div>
      <div className="flex pt-4 gap-4">
        <Button
          onPress={() => setIslogin(false)}
          className="w-max px-4 font-bold text-white bg-secondary-600"
        >
          Create Account <MdOutlineArrowOutward />
        </Button>
        <Button
          onPress={() => setIslogin(true)}
          variant="faded"
          className="w-max px-10 font-bold text-secondary-600 "
        >
          Login <MdOutlineArrowOutward />
        </Button>
      </div>
    </>
  );
};

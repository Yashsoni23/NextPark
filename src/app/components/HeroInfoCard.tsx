import { Button, Input } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { IoSearchCircleOutline } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useAuth } from "../context/firebase";

const HeroInfoCard = () => {
  const firebase = useAuth();
  const isloggedin = firebase?.user;
  return (
    <div className="flex flex-col gap-5 justify-center max-sm:w-full sm:w-1/2 py-20 pl-5">
      <h1 className="font-bold max-sm:text-2xl sm:text-4xl text-secondary-500 flex-col flex">
        {" "}
        Welcome to NextPark – Your Smart Parking Solution!
      </h1>
      <h1 className="font-semibold max-sm:text-md sm:text-2xl text-gray-800">
        {" "}
        Finding a parking spot has never been easier! NextPark helps you locate,
        book, and manage parking spaces hassle-free.
      </h1>

      {!isloggedin ? (
        <Button
          as={Link}
          href="/login"
          title="Explore"
          className="w-max px-10 font-bold text-white bg-secondary-600"
        >
          Explore <MdOutlineArrowOutward />
        </Button>
      ) : (
        <Input
          classNames={{
            base: "max-w-full border-3 border-secondary-600/50 sm:max-w-[20rem] h-10  rounded-lg",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500  dark:bg-default-500/20",
          }}
          placeholder="Type to search your nearest parking..."
          size="sm"
          startContent={
            <IoSearchCircleOutline size={28} className="text-secondary-600 " />
          }
          type="search"
        />
      )}
    </div>
  );
};

export default HeroInfoCard;

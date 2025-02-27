import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

const HeroInfoCard = () => {
  return (
    <div className="flex flex-col gap-5 justify-center  w-1/2 py-20 pl-5">
      <h1 className="font-bold text-4xl text-secondary-500 flex-col flex">
        {" "}
        Welcome to NextPark – Your Smart Parking Solution!
      </h1>
      <h1 className="font-semibold text-2xl text-gray-800">
        {" "}
        Finding a parking spot has never been easier! NextPark helps you locate,
        book, and manage parking spaces hassle-free.
      </h1>
      <Button
        as={Link}
        href="/login"
        title="Explore"
        className="w-max px-10 font-bold text-white bg-secondary-600"
      >
        Explore <MdOutlineArrowOutward />
      </Button>
    </div>
  );
};

export default HeroInfoCard;

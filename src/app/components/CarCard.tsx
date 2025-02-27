"use client";
import { Image } from "@heroui/react";
import { usePathname } from "next/navigation";
import React from "react";

const CarCard = () => {
  const pathname = usePathname();
  return (
    <div className="relative w-[25rem] h-max px-5 ">
      <Image
        isBlurred
        alt="HeroUI Album Cover"
        className={`m-5 absolute z-10 top-40  -left-32 ${
          pathname === "/login" ? "scale-x-[-1] left-32" : "-left-32"
        }`}
        src="car.png"
        width={540}
      />
      <Image
        isBlurred
        alt="HeroUI Album Cover"
        className="my-5 z-0 "
        src="nature.avif"
        width={"100%"}
        height={450}
      />
    </div>
  );
};

export default CarCard;

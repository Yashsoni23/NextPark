"use client";
import { Image } from "@heroui/react";
import { usePathname } from "next/navigation";
import React from "react";

const CarCard = () => {
  const pathname = usePathname();
  return (
    <div className="relative sm:w-[25rem]  max-sm:h-1/4 px-5 ">
      <Image
        alt="HeroUI Album Cover"
        className={`sm:m-5 absolute max-sm:w-48 z-10 sm:top-40 max-sm:top-28   max-sm:left-24 -left-32 ${
          pathname === "/login" ? "scale-x-[-1] left-32" : "-left-32"
        }`}
        src="car.png"
        width={540}
      />
      <Image
        isBlurred
        alt="HeroUI Album Cover"
        className="my-5 z-0 sm:w-full max-sm:w-2/ sm:h-[450px] max-sm:h-1/2"
        src="nature.avif"
      />
    </div>
  );
};

export default CarCard;

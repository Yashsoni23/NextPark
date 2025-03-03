"use client";
import React from "react";
import { Spinner } from "@heroui/react";

const Loading = ({ text }: { text?: string }) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-screen ">
      <Spinner
        classNames={{ label: "text-secondary " }}
        variant="default"
        size="lg"
      />
      <h1 className="text-lg font-bold">{text}</h1>
      {/* <LoadingSkeleton /> */}
    </div>
  );
};

export default Loading;

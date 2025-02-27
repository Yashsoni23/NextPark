"use client";
import React from "react";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { Spinner } from "@heroui/react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <Spinner
        classNames={{ label: "text-secondary " }}
        variant="default"
        size="lg"
      />
      {/* <LoadingSkeleton /> */}
    </div>
  );
};

export default Loading;

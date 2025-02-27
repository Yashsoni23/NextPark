import React from "react";
import Nav from "./Navbar";

const LoadingSkeleton = () => {
  return (
    <>
      <Nav />

      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-white z-50">
        <div className="animate-pulse space-y-4 text-center">
          <div className="h-8 w-32 bg-gray-300 rounded mx-auto"></div>{" "}
          {/* Logo Placeholder */}
          <div className="h-4 w-48 bg-gray-300 rounded mx-auto"></div>{" "}
          {/* Heading */}
          <div className="h-3 w-32 bg-gray-300 rounded mx-auto"></div>{" "}
          {/* Subtext */}
          <div className="h-40 w-40 bg-gray-300 rounded-full mx-auto"></div>{" "}
          {/* Circular Loader */}
        </div>
      </div>
    </>
  );
};

export default LoadingSkeleton;

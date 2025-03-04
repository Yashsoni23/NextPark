import React from "react";
import CarCard from "../components/CarCard";
import Login from "../components/Login";

const Page = () => {
  return (
    <div className=" px-5 sm:justify-between flex max-sm:flex-col ">
      <CarCard />
      <Login />
    </div>
  );
};

export default Page;

import React from "react";
import CarCard from "../components/CarCard";
import Login from "../components/Login";

const Page = () => {
  return (
    <div className=" px-5 justify-between flex ">
      <CarCard />
      <Login />
    </div>
  );
};

export default Page;

"use client";
import React, { useEffect } from "react";

import CarCard from "./components/CarCard";
import HeroInfoCard from "./components/HeroInfoCard";
import GoogleMapComponent from "./components/GoogleMap";
import { useAuth } from "./context/firebase";
function HomePage() {
  const firebase = useAuth();
  return (
    <div
      className={`px-5 ${
        firebase?.user ? "" : "flex"
      } justify-between rounded-md h-[80vh] `}
    >
      {firebase?.user ? (
        <GoogleMapComponent />
      ) : (
        <>
          <HeroInfoCard />
          <CarCard />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

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
        firebase?.user ? "" : "flex max-sm:flex-col"
      } justify-between rounded-md h-[80vh]  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100/5 via-slate-300/60 to-slate-300/60`}
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

"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Nav from "./components/Navbar";
import MyBookingsPage from "./mybookings/page";
import { Input } from "@heroui/react";
import { Button, Image } from "@heroui/react";
import { MdEmail, MdOutlineArrowOutward } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { TbEyeFilled } from "react-icons/tb";
import Login from "./components/Login";
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

function LoginPage() {
  return <div className="p-5 text-center">Login Page</div>;
}

function Dashboard() {
  return <div className="p-5">User Dashboard</div>;
}

function BookingPage() {
  return <div className="p-5">Slot Booking Page</div>;
}

function PaymentPage() {
  return <div className="p-5">Payment Page</div>;
}

function ConfirmationPage() {
  return <div className="p-5">Booking Confirmation Page</div>;
}

function MyBookings() {
  return <div className="p-5">My Bookings Page</div>;
}

function Profile() {
  return <div className="p-5">Profile & Settings</div>;
}

function AdminDashboard() {
  return <div className="p-5">Admin Dashboard</div>;
}

function ManageSlots() {
  return <div className="p-5">Manage Parking Slots</div>;
}

function ManageUsers() {
  return <div className="p-5">Manage Users</div>;
}

function ViewBookings() {
  return <div className="p-5">View Bookings</div>;
}

function Reports() {
  return <div className="p-5">Reports & Analytics</div>;
}

export default function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

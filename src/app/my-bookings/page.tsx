"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import QRCode from "react-qr-code";
import { fetchUserBookings } from "../api/BookingApi";
import { useAuth } from "../context/firebase";
import Loading from "../loading";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const firebase = useAuth();
  const [loading, setLoading] = useState(false);
  // Fetch User Bookings
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserBookings(firebase?.user?.uid);

        // Sort bookings by createdAt (latest first)
        const sortedData = data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setLoading(false);
        setBookings(sortedData);
      } catch (err: any) {
        console.log(err.message);
      }
    };
    loadData();
  }, []);

  // Function to check if booking is active or expired
  const getBookingStatus = (booking: any) => {
    const currentDate = new Date(); // Current date
    const bookingDate = new Date(booking.date); // Booking date

    // Remove time part from both dates for accurate comparison
    const currentDateString = currentDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
    const bookingDateString = bookingDate.toISOString().split("T")[0]; // "YYYY-MM-DD"

    if (bookingDateString > currentDateString) return "Active"; // Future booking
    if (bookingDateString < currentDateString) return "Expired"; // Past booking

    // If the booking is for today, check the time
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentTotalMinutes = currentHours * 60 + currentMinutes; // Convert to total minutes

    const [endHours, endMinutes] = booking.endTime.split(":").map(Number);
    const endTotalMinutes = endHours * 60 + endMinutes; // Convert to total minutes

    return currentTotalMinutes <= endTotalMinutes ? "Active" : "Expired";
  };

  return (
    <div className="min-h-screen gap-4 p-6 bg-gray-100 flex flex-col items-center">
      <Card className="w-full flex p-3 justify-center max-w-5xl">
        <h1 className="text-2xl text-center font-bold text-secondary-600">
          My Bookings
        </h1>
      </Card>
      {loading && <Loading />}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="w-full max-w-5xl space-y-4">
          {bookings.map((booking: any) => {
            const status = getBookingStatus(booking);
            return (
              <Card key={booking?._id} className="p-4 w-full shadow-md flex">
                <div className="flex justify-between">
                  <div className="w-max max-sm:text-sm sm:text-md">
                    <p className="font-semibold text-secondary-600 text-xl">
                      Parking Area: {booking.location}
                    </p>
                    <p>Vehicle: {booking.vehicleNumber}</p>
                    <p>Slot: {booking.slot}</p>
                  </div>

                  {/* QR Code */}
                  <div className="flex flex-col justify-center items-center gap-2">
                    <QRCode
                      value={booking.sessionId}
                      className="w-16 h-16 max-sm:w-16 max-sm:h-16"
                    />
                    <p
                      className={`font-bold border-2 rounded-full px-2 ${
                        status === "Active"
                          ? "text-green-600 border-green-600"
                          : "text-red-600 border-red-600"
                      }`}
                    >
                      {status}
                    </p>
                  </div>
                </div>
                <Link href={`/my-bookings/${booking?._id}`}>
                  <Button className="mt-2 bg-secondary-600 w-full text-white">
                    View Details
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

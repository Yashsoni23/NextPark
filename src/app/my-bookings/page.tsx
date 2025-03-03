"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import QRCode from "react-qr-code";

const dummyBookings = [
  {
    id: "1",
    name: "John Doe",
    vehicle: "GJ-01-AB-1234",
    location: "Mall Parking Lot A",
    slot: "B12",
    duration: 3,
    date: new Date().toDateString(), // Today's date
    time: "10:00 AM",
    endTime: "16:00 PM", // Will expire if current time is after 1:00 PM
  },
  {
    id: "2",
    name: "Jane Smith",
    vehicle: "DL-05-CZ-5678",
    location: "Airport Parking Zone C",
    slot: "C24",
    duration: 5,
    date: new Date().toDateString(), // Today's date
    time: "6:00 PM",
    endTime: "11:00 PM", // Active if current time is before 11:00 PM
  },
  {
    id: "3",
    name: "Alex Johnson",
    vehicle: "MH-12-XY-7890",
    location: "Office Parking Lot",
    slot: "A10",
    duration: 4,
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toDateString(), // Yesterday’s date
    time: "8:00 AM",
    endTime: "12:00 PM", // Expired
  },
];

export default function MyBookings() {
  const [bookings, setBookings] = useState(dummyBookings);

  // Function to check if a booking is active
  const getBookingStatus = (booking: any) => {
    const currentDate = new Date();
    const bookingDate = new Date(booking.date);
    const [startHours, startMinutes] = booking.time.split(/:| /);
    const [endHours, endMinutes] = booking.endTime.split(/:| /);

    const isPM = (time: any) => time.includes("PM");
    const to24HourFormat = (hours: any, minutes: any, isPM: any) =>
      (isPM ? (parseInt(hours) % 12) + 12 : parseInt(hours) % 12) * 60 +
      parseInt(minutes);

    const startMinutesTotal = to24HourFormat(
      startHours,
      startMinutes,
      isPM(booking.time)
    );
    const endMinutesTotal = to24HourFormat(
      endHours,
      endMinutes,
      isPM(booking.endTime)
    );
    const currentMinutesTotal =
      currentDate.getHours() * 60 + currentDate.getMinutes();

    if (
      currentDate.toDateString() === bookingDate.toDateString() &&
      currentMinutesTotal >= startMinutesTotal &&
      currentMinutesTotal <= endMinutesTotal
    ) {
      return "Active";
    }

    return "Expired";
  };

  return (
    <div className="min-h-screen gap-4 p-6 bg-gray-100 flex flex-col items-center">
      <Card className="w-full flex p-3 justify-center max-w-5xl">
        <h1 className="text-2xl text-center font-bold   text-secondary-600">
          My Bookings
        </h1>
      </Card>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="w-full max-w-5xl space-y-4">
          {bookings.map((booking) => {
            const status = getBookingStatus(booking);
            return (
              <Card key={booking.id} className="p-4 w-full shadow-md flex  ">
                <div className="flex justify-between">
                  <div className="w-max max-sm:text-sm sm:text-md">
                    <p className="font-semibold text-secondary-600 text-xl">
                      Parking Area: {booking.location}
                    </p>
                    <p>Vehicle: {booking.vehicle}</p>
                    <p>Slot: {booking.slot}</p>
                  </div>

                  {/* QR Code */}
                  <div className="flex flex-col justify-center items-center gap-2">
                    <QRCode
                      value={booking.id}
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
                <Link href={`/my-bookings/${booking.id}`}>
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

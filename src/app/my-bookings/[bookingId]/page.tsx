"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Button, CardHeader } from "@heroui/react";
import QRCode from "react-qr-code";

const dummyBookings = [
  {
    id: "1",
    name: "John Doe",
    vehicle: "GJ-01-AB-1234",
    location: "Mall Parking Lot A",
    slot: "B12",
    duration: 3,
    date: new Date().toDateString(),
    time: "10:00 AM",
    endTime: "16:00", // Using 24-hour format for accurate calculations
  },
  {
    id: "2",
    name: "Jane Smith",
    vehicle: "DL-05-CZ-5678",
    location: "Airport Parking Zone C",
    slot: "C24",
    duration: 5,
    date: new Date().toDateString(),
    time: "14:00",
    endTime: "19:00",
  },
];

export default function BookingDetails({
  params,
}: {
  params: { bookingId: string };
}) {
  const { bookingId } = params;
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const foundBooking = dummyBookings.find((b) => b.id === bookingId);
    if (!foundBooking) return;
    setBooking(foundBooking);

    const now = new Date();
    const bookingDate = new Date(foundBooking.date);
    const [endHour, endMin] = foundBooking.endTime.split(":").map(Number);
    bookingDate.setHours(endHour, endMin, 0, 0);

    const remainingTime = bookingDate.getTime() - now.getTime();
    if (remainingTime > 0) {
      setTimeLeft(Math.floor(remainingTime / 1000));
    }
  }, [bookingId]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  if (!booking) return <p className="text-center mt-6">Booking not found.</p>;

  const formatTime: any = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen p-6 gap-4 bg-gray-100 flex flex-col items-center">
      <Card className="w-full flex p-3 justify-center max-w-5xl">
        <h1 className="text-2xl text-center font-bold   text-secondary-600">
          Booking Details
        </h1>
      </Card>
      <Card className="p-6 w-full max-w-5xl shadow-lg">
        <div className="flex justify-between gap-8 max-sm:flex-col-reverse">
          <div className="">
            <p className="text-lg font-semibold">
              Parking Area: {booking.location}
            </p>
            <p>Vehicle: {booking.vehicle}</p>
            <p>Slot: {booking.slot}</p>
            <p>Duration: {booking.duration} Hours</p>
            <p>Date: {booking.date}</p>
            <p>
              Time: {booking.time} - {booking.endTime}
            </p>
          </div>
          <QRCode
            value={booking.id}
            className="w-36 h-36 p-2 self-center max-sm:w-48 max-sm:h-48"
          />
        </div>

        {!timeLeft !== null && (
          <div className="text-center mt-4 bg-red-500 text-white font-bold text-2xl p-2 rounded-lg">
            Time Left: {formatTime(timeLeft)}
          </div>
        )}

        <Button
          className="mt-4 bg-secondary-600 text-white text-xl p-6 w-full"
          onPress={() => router.back()}
        >
          Back to My Bookings
        </Button>
      </Card>
    </div>
  );
}

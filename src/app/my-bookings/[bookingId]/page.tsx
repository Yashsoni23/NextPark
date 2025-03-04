"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Button } from "@heroui/react";
import QRCode from "react-qr-code";
import Countdown from "react-countdown";
import { fetchSingleBooking } from "@/app/api/BookingApi";
import Loading from "@/app/loading";

export default function BookingDetails({
  params,
}: {
  params: { bookingId: string };
}) {
  const [loading, setLoading] = useState(true);
  const { bookingId } = params;
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  // Fetch booking data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSingleBooking(bookingId);
        setBooking(data);

        if (data) {
          const now = new Date();
          const bookingDate = new Date(data.date); // Booking Date

          // Extract hours & minutes from start & end times
          const [startHour, startMin] = data.startTime.split(":").map(Number);
          const [endHour, endMin] = data.endTime.split(":").map(Number);

          // Set endTime with correct date and time
          const calculatedEndTime = new Date(bookingDate);
          calculatedEndTime.setHours(endHour, endMin, 0, 0);

          // Handle cases where endTime is on the next day (e.g., 23:30 - 00:30)
          if (calculatedEndTime < now) {
            calculatedEndTime.setDate(calculatedEndTime.getDate() + 1);
          }

          setEndTime(calculatedEndTime);
        }

        setLoading(false);
      } catch (err: any) {
        console.log(err.message);
      }
    };
    loadData();
  }, [bookingId]);

  if (!booking) return <Loading />;

  return (
    <div className="min-h-screen p-6 gap-4 bg-gray-100 flex flex-col items-center">
      <Card className="w-full flex p-3 justify-center max-w-5xl">
        <h1 className="text-2xl text-center font-bold text-secondary-600">
          Booking Details
        </h1>
      </Card>

      {loading ? (
        <Loading />
      ) : (
        <Card className="p-6 w-full max-w-5xl shadow-lg">
          <div className="flex justify-between gap-8 max-sm:flex-col-reverse">
            <div>
              <p className="text-lg font-semibold">
                Parking Area: {booking?.location}
              </p>
              <p>Vehicle: {booking?.vehicleNumber}</p>
              <p>Slot: {booking?.slot}</p>
              <p>Duration: {booking?.duration} Hours</p>
              <p>Date: {booking?.date}</p>
              <p>
                Time: {booking?.startTime} - {booking?.endTime}
              </p>
            </div>
            <QRCode
              value={booking?._id}
              className="w-36 h-36 p-2 self-center max-sm:w-48 max-sm:h-48"
            />
          </div>

          {/* Timer Display using react-countdown */}
          {endTime && endTime.getTime() > Date.now() ? (
            <div className="text-center mt-4 bg-red-500 text-white font-bold text-2xl p-2 rounded-lg">
              Time Left:{" "}
              <Countdown
                date={endTime}
                zeroPadTime={2}
                daysInHours
                renderer={({ hours, minutes, seconds }) => (
                  <span>{`${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds
                    .toString()
                    .padStart(2, "0")}`}</span>
                )}
              />
            </div>
          ) : (
            <div className="text-center mt-4 bg-gray-500 text-gray-200 font-bold text-2xl p-2 rounded-lg">
              Booking Expired
            </div>
          )}

          <Button
            className="mt-4 bg-secondary-600 text-white text-xl p-6 w-full"
            onPress={() => router.back()}
          >
            Back to My Bookings
          </Button>
        </Card>
      )}
    </div>
  );
}

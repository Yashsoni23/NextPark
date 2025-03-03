"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { addToast, Button, Card } from "@heroui/react";
import Loading from "../loading";
import { RxCross1 } from "react-icons/rx";

export default function FailedPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const toastShownRef = useRef(false);

  useEffect(() => {
    setFormData(JSON.parse(localStorage.getItem("bookingData") as any));
    if (!toastShownRef.current) {
      addToast({
        title: "Payment Failed ❌",
        color: "danger",
        variant: "solid",
        size: "lg",
      });
      toastShownRef.current = true;
    }
  }, []);

  if (loading)
    return (
      <>
        <Loading text="Fetching Payment status...." />
      </>
    );

  return (
    <>
      <div className="flex bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-400 via-red-600 to-red-400 flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
        {/* Payment Failed Message */}
        <div className="flex flex-col justify-center items-center bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-xl font-bold mb-2 text-red-600">
            Payment Failed
          </h2>

          <p className="mt-2 text-gray-600 text-center">
            Unfortunately, your payment was not successful. Please try again.
          </p>

          {/* Ticket Details */}
          <Card className="shadow-lg rounded-lg p-4 mt-4 w-full">
            <div className="space-y-3 text-gray-700">
              {/* Name & Vehicle */}
              <div className="flex w-full ">
                <div className="w-2/3">
                  <p className="text-sm font-semibold">Name</p>
                  <p className="text-lg font-bold">{formData?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Vehicle Number</p>
                  <p className="text-lg font-bold">{formData?.vehicle}</p>
                </div>
              </div>

              {/* Parking Area & Slot */}
              <div className="flex w-full ">
                <div className="w-2/3">
                  <p className="text-sm font-semibold">Parking Area</p>
                  <p className="text-lg font-bold">{formData?.location}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Parking Slot</p>
                  <p className="text-lg font-bold">{formData?.slot}</p>
                </div>
              </div>

              {/* Duration & Time */}
              <div className="flex w-full ">
                <div className="w-2/3">
                  <p className="text-sm font-semibold">Duration</p>
                  <p className="text-lg font-bold">
                    {formData?.duration} Hours
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Time</p>
                  <p className="text-lg font-bold">
                    {formData?.time} - {formData?.endTime}
                  </p>
                </div>
              </div>

              {/* Date & Phone Number */}
              <div className="flex w-full ">
                <div className="w-2/3">
                  <p className="text-sm font-semibold">Date</p>
                  <p className="text-lg font-bold">
                    {new Date().toDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Phone Number</p>
                  <p className="text-lg font-bold">{9510411077}</p>
                </div>
              </div>

              {/* Amount Paid */}
              <div className="text-center mt-2">
                <p className="text-sm font-semibold">Amount Attempted</p>
                <p className="text-lg font-bold text-green-600">
                  ${formData?.totalAmount}
                </p>
              </div>
            </div>
          </Card>

          {/* Retry Payment Button */}
          <Button
            className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg shadow-md w-full"
            onPress={() => (window.location.href = "/")}
          >
            Retry Payment
          </Button>
        </div>
      </div>
    </>
  );
}

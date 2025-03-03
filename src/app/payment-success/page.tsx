"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { addToast, Button, Card } from "@heroui/react";
import Loading from "../loading";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const qrRef = useRef(null);
  const toastShownRef = useRef(false);
  const router = useRouter();
  useEffect(() => {
    async function fetchSession() {
      if (!sessionId) return;
      try {
        const response = await fetch(
          `/api/verify-payment?session_id=${sessionId}`
        );
        const data = await response.json();
        setSessionData(data);
        setFormData(JSON.parse(localStorage.getItem("bookingData") as any));
        setLoading(false);
        if (!toastShownRef.current) {
          addToast({
            title: "Payment Successful 🎉🎉🎉",
            color: "success",
            variant: "solid",
            size: "lg",
          });
          toastShownRef.current = true; // Mark toast as shown
        }
        setTimeout(() => {
          router.push("/my-bookings");
        }, 15000);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    }
    fetchSession();
  }, [sessionId, router]);

  const saveQRCode = async () => {
    if (qrRef.current) {
      const canvas = await html2canvas(qrRef.current);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "parking_ticket.png";
      link.click();
    }
  };

  if (loading)
    return (
      <>
        <Loading text="Fetching Payment status...." />
      </>
    );

  return (
    <>
      {sessionData.payment_status === "paid" && (
        <div className="flex bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-success-400 via-green-600 to-green-400 flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
          {/* Parking Ticket */}
          <div
            ref={qrRef}
            className="flex flex-col justify-center items-center bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-2">Parking Ticket</h2>

            {/* QR Code */}
            <QRCode
              value={sessionData?.id || "https://your-parking-confirmation.com"}
              className=" max-sm:w-32 max-sm:h-32 sm:w-42 sm:w-42 "
            />
            <p className="mt-2 text-gray-600 text-center">
              Scan this QR on the scanner machine when you are in the parking
              lot.
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
                  <p className="text-sm font-semibold">Amount Paid</p>
                  <p className="text-lg font-bold text-green-600">
                    ${formData?.totalAmount}
                  </p>
                </div>
              </div>
            </Card>

            {/* Save Ticket Button */}
            <Button
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md w-full"
              onPress={saveQRCode}
            >
              Save Ticket
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

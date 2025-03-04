"use client";
import { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
  Input,
  Card,
  addToast,
} from "@heroui/react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

export default function ParkingBookingForm({
  isOpen,
  onOpen,
  onClose,
  onOpenChange,
  selectedParking,
  selectedSlot,
}: any) {
  const [showValidationWarning, setShowValidationWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    parkingId: selectedParking?._id,
    name: "",
    vehicleNumber: "",
    mobileNumber: "",
    vehicleType: "Two Wheeler",
    startTime: "15:00",
    duration: 1,
    location: selectedParking?.name,
    slot: selectedSlot,
    totalAmount: "20",
    endTime: "19:00",
  });

  useEffect(() => {
    if (isOpen && selectedSlot) {
      setStep(1);
      setFormData({
        parkingId: selectedParking?._id,
        name: "",
        vehicleNumber: "",
        mobileNumber: "",
        vehicleType: "Two Wheeler",
        startTime: "15:00",
        duration: 1,
        location: selectedParking?.name,
        slot: selectedSlot,
        totalAmount: `${selectedParking.pricePerHour}`,
        endTime: "19:00",
      });
    }
  }, [isOpen, selectedSlot]);

  console.log({ selectedParking, selectedSlot });
  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVehicleType = (type: any) => {
    setFormData({ ...formData, vehicleType: type });
  };

  const handleTimeChange = (e: any) => {
    const newTime = e.target.value;
    setFormData({
      ...formData,
      startTime: newTime,
      endTime: calculateEndTime(newTime, formData.duration),
    });
  };

  const handleDurationChange = (duration: any) => {
    setFormData({
      ...formData,
      duration,
      totalAmount: `${duration * selectedParking?.pricePerHour}`,
      endTime: calculateEndTime(formData.startTime, duration),
    });
  };

  const calculateEndTime = (startTime: any, duration: any) => {
    let [hours, minutes] = startTime.split(":").map(Number);
    hours += duration;
    if (hours >= 24) hours -= 24;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const qrRef = useRef(null);

  const handleCheckout = async () => {
    setLoading(true);
    console.log({ formData });
    localStorage.setItem("bookingData", JSON.stringify(formData)); // Store booking details
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: formData.totalAmount,
          success_url: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/payment-failed`,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.url) {
        window.location.href = data.url;

        addToast({
          title: "Payment done successfully!!! ",
          color: "success",
          size: "lg",
          variant: "solid",
        });
      } else {
        addToast({
          title: "Payment Failed. Please try again. ",
          color: "danger",
          size: "lg",
          variant: "solid",
        });
      }
    } catch (error) {
      setLoading(false);
      addToast({
        title: "An error occurred. Please try again. ",
        color: "danger",
        size: "lg",
        variant: "solid",
      });
    }
  };
  return (
    <>
      {isOpen && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          {/* {step === 1 && (
        <Button onPress={onOpen} color="primary">
          Open Parking Selection
        </Button>
      )} */}

          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {() => (
                <>
                  {step === 1 && (
                    <>
                      <ModalHeader>
                        Please Select Further Information
                      </ModalHeader>
                      <ModalBody>
                        <RadioGroup
                          label="Choose Vehicle Type"
                          value={formData.vehicleType}
                          onValueChange={handleVehicleType}
                        >
                          <Radio value="Two Wheeler">Two Wheeler</Radio>
                          <Radio value="Four Wheeler">Four Wheeler</Radio>
                        </RadioGroup>
                        <label className="block mt-4 font-medium">
                          Choose Time For Parking
                        </label>
                        <Input
                          type="time"
                          value={formData.startTime}
                          onChange={handleTimeChange}
                          className="w-full mt-2"
                        />
                        <label className="block mt-4 font-medium">
                          Duration For Parking (Hours)
                        </label>
                        <div className="flex justify-between mt-2 flex-wrap gap-2">
                          {[1, 2, 3, 4, 5, 6].map((hour) => (
                            <Button
                              key={hour}
                              color={
                                formData.duration === hour
                                  ? "primary"
                                  : "default"
                              }
                              variant="solid"
                              onPress={() => handleDurationChange(hour)}
                            >
                              {hour}h
                            </Button>
                          ))}
                        </div>
                        <p className="mt-4 text-lg font-semibold">
                          Total Amount: ₹{formData.totalAmount}
                        </p>
                        <p className="mt-2 text-lg">
                          Parking Time: {formData.startTime} to{" "}
                          {formData.endTime}
                        </p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button color="primary" onPress={() => setStep(2)}>
                          Next
                        </Button>
                      </ModalFooter>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <ModalHeader>Add Details</ModalHeader>
                      <ModalBody>
                        <Input
                          isRequired
                          type="text"
                          name="name"
                          placeholder="Enter Your Full Name"
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2"
                        />
                        <Input
                          isRequired
                          type="text"
                          name="vehicleNumber"
                          placeholder="Vehicle Number"
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 mt-2"
                        />
                        <Input
                          isRequired
                          type="text"
                          name="mobileNumber"
                          placeholder="Mobile Number"
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 mt-2"
                        />
                        {showValidationWarning && (
                          <p className="text-red-600 font-semibold border-2 border-red-500/50 rounded-md p-2 text-center">
                            Please fillup all fields
                          </p>
                        )}
                      </ModalBody>

                      <ModalFooter className="w-full">
                        <div className="flex w-full justify-between">
                          <Button
                            type="submit"
                            color="primary"
                            variant="flat"
                            onPress={() => setStep((value) => value - 1)}
                          >
                            Previous
                          </Button>
                          <div className="flex">
                            <Button
                              color="danger"
                              variant="light"
                              onPress={onClose}
                            >
                              Close
                            </Button>
                            <Button
                              color="primary"
                              onPress={() => {
                                if (
                                  formData.mobileNumber &&
                                  formData.name &&
                                  formData.vehicleNumber
                                ) {
                                  setStep(3);
                                } else {
                                  setShowValidationWarning(true);
                                }
                              }}
                            >
                              Checkout
                            </Button>
                          </div>
                        </div>
                      </ModalFooter>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <ModalHeader>Payment Details</ModalHeader>
                      <ModalBody>
                        <p className="font-medium">{formData.location}</p>
                        <p className="text-gray-600">Slot #{formData.slot}</p>
                        <p className="mt-2 font-bold text-xl">
                          ₹{formData.totalAmount}
                        </p>
                      </ModalBody>

                      <ModalFooter className="w-full">
                        <div className="flex w-full justify-between">
                          <Button
                            color="primary"
                            variant="flat"
                            onPress={() => setStep((value) => value - 1)}
                          >
                            Previous
                          </Button>
                          <div className="flex">
                            <Button
                              color="danger"
                              variant="light"
                              onPress={onClose}
                            >
                              Close
                            </Button>
                            <Button
                              color="primary"
                              onPress={() => handleCheckout()}
                              disabled={loading}
                            >
                              {loading ? "Processing..." : "Pay Now"}
                            </Button>
                          </div>
                        </div>
                      </ModalFooter>
                    </>
                  )}
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  );
}

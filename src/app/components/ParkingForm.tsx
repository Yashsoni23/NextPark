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
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    vehicle: "",
    phone: "",
    vehicleType: "Two Wheeler",
    time: "15:00",
    duration: 4,
    location: selectedParking?.name,
    slot: selectedSlot,
    totalAmount: "$20",
    endTime: "19:00",
  });

  useEffect(() => {
    if (isOpen && selectedSlot) {
      setStep(1);
      setFormData({
        name: "",
        vehicle: "",
        phone: "",
        vehicleType: "Two Wheeler",
        time: "15:00",
        duration: 4,
        location: selectedParking?.name,
        slot: selectedSlot,
        totalAmount: "20",
        endTime: "19:00",
      });
    }
  }, [isOpen, selectedSlot]);

  console.log({ selectedParking, selectedSlot });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVehicleType = (type) => {
    setFormData({ ...formData, vehicleType: type });
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setFormData({
      ...formData,
      time: newTime,
      endTime: calculateEndTime(newTime, formData.duration),
    });
  };

  const handleDurationChange = (duration) => {
    setFormData({
      ...formData,
      duration,
      totalAmount: `${duration * 5}`,
      endTime: calculateEndTime(formData.time, duration),
    });
  };

  const calculateEndTime = (startTime, duration) => {
    let [hours, minutes] = startTime.split(":").map(Number);
    hours += duration;
    if (hours >= 24) hours -= 24;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const qrRef = useRef(null);

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
  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: formData.totalAmount,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        addToast({
          title: "Payment done successfully!!! ",
          color: "success",
          size: "lg",
          variant: "solid",
        });
        setStep(3); // Move to the next step to show ticket
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
                          value={formData.time}
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
                          Total Amount: ${formData.totalAmount}
                        </p>
                        <p className="mt-2 text-lg">
                          Parking Time: {formData.time} to {formData.endTime}
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
                          type="text"
                          name="name"
                          placeholder="Enter Your Full Name"
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2"
                        />
                        <Input
                          type="text"
                          name="vehicle"
                          placeholder="Vehicle Number"
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 mt-2"
                        />
                        <Input
                          type="text"
                          name="phone"
                          placeholder="Mobile Number"
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 mt-2"
                        />
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
                              onPress={() => {
                                handleCheckout();
                              }}
                              disabled={loading}
                            >
                              {loading ? "Processing..." : "Pay Now"}
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
                        <p className="text-gray-600">{formData.slot}</p>
                        <p className="mt-2 font-bold text-xl">
                          {formData.totalAmount}
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
                            <Button color="primary" onPress={() => setStep(4)}>
                              Pay Now
                            </Button>
                          </div>
                        </div>
                      </ModalFooter>
                    </>
                  )}

                  {step === 4 && (
                    <div
                      ref={qrRef}
                      className="flex flex-col justify-center items-center"
                    >
                      <ModalHeader>Parking Ticket</ModalHeader>
                      <QRCode
                        value="https://your-parking-confirmation.com"
                        className=" max-sm:w-32 max-sm:h-32 sm:w-42 sm:w-42 "
                      />
                      <ModalBody className="text-left">
                        <p className="text-gray-600 text-center">
                          Scan this QR on the scanner machine when you are in
                          the parking lot.
                        </p>
                        <Card className=" shadow-xl rounded-xl p-4">
                          <div className="space-y-3 text-gray-700">
                            <div className="flex w-full ">
                              <div className="w-1/2">
                                <p className="text-sm  font-semibold">Name</p>
                                <p className="text-lg font-bold">
                                  {formData.name}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold">
                                  Vehicle Number
                                </p>
                                <p className="text-lg font-bold">
                                  {formData.vehicle}
                                </p>
                              </div>
                            </div>

                            <div className="flex w-full ">
                              <div className="w-1/2">
                                <p className="text-sm  font-semibold">
                                  Parking Area
                                </p>
                                <p className="text-lg font-bold">
                                  {formData.location}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold">
                                  Parking Slot
                                </p>
                                <p className="text-lg font-bold">
                                  {formData.slot}
                                </p>
                              </div>
                            </div>

                            <div className="flex w-full ">
                              <div className="w-1/2">
                                <p className="text-sm  font-semibold">
                                  Duration
                                </p>
                                <p className="text-lg font-bold">
                                  {formData.duration} Hours
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold">Time</p>
                                <p className="text-lg font-bold">
                                  {formData.time} To {formData.endTime}
                                </p>
                              </div>
                            </div>

                            <div className="flex w-full ">
                              <div className="w-1/2">
                                <p className="text-sm  font-semibold">Date</p>
                                <p className="text-lg font-bold">
                                  Wed 08 Nov, 2023
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold">
                                  Phone Number
                                </p>
                                <p className="text-lg font-bold">
                                  {formData.phone}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </ModalBody>

                      <ModalFooter className="w-full">
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button color="primary" onPress={() => saveQRCode()}>
                          Save
                        </Button>
                      </ModalFooter>
                    </div>
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

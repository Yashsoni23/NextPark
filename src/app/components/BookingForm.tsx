"use client";
import React, { useState } from "react";

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    vehicleNumber: "",
    vehicleType: "Car",
    vehicleModel: "",
    date: "",
    entryTime: "",
    exitTime: "",
    slot: "",
    paymentMethod: "UPI",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="p-5 max-w-md mx-auto bg-white shadow-md rounded-md">
      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold">User Information</h2>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="border p-2 w-full mt-2"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="border p-2 w-full mt-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email (Optional)"
            onChange={handleChange}
            className="border p-2 w-full mt-2"
          />
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white p-2 mt-3 w-full"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold">Vehicle Information</h2>
          <input
            type="text"
            name="vehicleNumber"
            placeholder="Vehicle Number"
            onChange={handleChange}
            className="border p-2 w-full mt-2"
            required
          />
          <select
            name="vehicleType"
            onChange={handleChange}
            className="border p-2 w-full mt-2"
          >
            <option>Car</option>
            <option>Bike</option>
            <option>SUV</option>
          </select>
          <input
            type="text"
            name="vehicleModel"
            placeholder="Vehicle Model"
            onChange={handleChange}
            className="border p-2 w-full mt-2"
          />
          <button onClick={prevStep} className="bg-gray-300 p-2 mt-3">
            Back
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white p-2 mt-3 ml-2"
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-lg font-semibold">Booking Details</h2>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="border p-2 w-full mt-2"
            required
          />
          <input
            type="time"
            name="entryTime"
            onChange={handleChange}
            className="border p-2 w-full mt-2"
            required
          />
          <input
            type="time"
            name="exitTime"
            onChange={handleChange}
            className="border p-2 w-full mt-2"
            required
          />
          <input
            type="text"
            name="slot"
            placeholder="Slot Number"
            onChange={handleChange}
            className="border p-2 w-full mt-2"
            required
          />
          <button onClick={prevStep} className="bg-gray-300 p-2 mt-3">
            Back
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white p-2 mt-3 ml-2"
          >
            Next
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-lg font-semibold">Payment & Confirmation</h2>
          <select
            name="paymentMethod"
            onChange={handleChange}
            className="border p-2 w-full mt-2"
          >
            <option>UPI</option>
            <option>Card</option>
            <option>Wallet</option>
            <option>Cash</option>
          </select>
          <button onClick={prevStep} className="bg-gray-300 p-2 mt-3">
            Back
          </button>
          <button
            onClick={() => alert("Booking Confirmed!")}
            className="bg-green-500 text-white p-2 mt-3 ml-2"
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingForm;

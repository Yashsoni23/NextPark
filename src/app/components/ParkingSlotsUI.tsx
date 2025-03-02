import React, { useState } from "react";
import { FaMotorcycle, FaCar, FaDoorOpen, FaDoorClosed } from "react-icons/fa";
import { Card, CardContent } from "@heroui/react";

const ParkingSlots = ({ slots }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const getSlotColor = (slot) => {
    if (selectedSlot === slot.id) return "bg-blue-500";
    if (slot.status === "available") return "bg-green-500 hover:bg-green-700";
    if (slot.status === "occupied") return "bg-red-500 hover:bg-red-700";
    return "bg-gray-400";
  };

  return (
    <div className="relative grid grid-cols-2 gap-4 p-5 md:grid-cols-4 lg:grid-cols-6">
      {/* Entry Gate */}
      <Card className="absolute top-0 left-0 flex items-center gap-2 p-2 bg-gray-800 text-white rounded-md shadow-lg">
        <FaDoorOpen className="text-yellow-400" /> Entry Gate
      </Card>

      {/* Exit Gate */}
      <Card className="absolute top-0 right-0 flex items-center gap-2 p-2 bg-gray-800 text-white rounded-md shadow-lg">
        <FaDoorClosed className="text-red-500" /> Exit Gate
      </Card>

      {slots.map((slot) => (
        <CardContent
          key={slot.id}
          className={`p-4 text-white text-center rounded-lg cursor-pointer transition-all duration-300 flex flex-col items-center justify-center shadow-md ${getSlotColor(
            slot
          )}`}
          onClick={() =>
            slot.status === "available" && setSelectedSlot(slot.id)
          }
          title={
            slot.status === "occupied"
              ? `Slot ${slot.id} - Available at: ${slot.nextAvailable}`
              : `Slot ${slot.id} - Click to select`
          }
        >
          <p>Slot {slot.id}</p>
          {slot.vehicleType === "2-wheeler" ? (
            <FaMotorcycle className="text-white text-2xl mt-1" />
          ) : slot.vehicleType === "4-wheeler" ? (
            <FaCar className="text-white text-2xl mt-1" />
          ) : null}
          {slot.status === "occupied" && (
            <p className="text-xs mt-1">Available at: {slot.nextAvailable}</p>
          )}
        </CardContent>
      ))}
    </div>
  );
};

export default ParkingSlots;

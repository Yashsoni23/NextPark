"use client";
import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import ParkingUI from "./ParkingForm";
import ParkingBookingForm from "./ParkingForm";
const mapContainerStyle = {
  width: "100%",
  height: "100%",
  boxShadow: " 0 0 20px rgba(0,0,0,0.25)",
  borderRadius: "1rem",
};
const defaultCenter = { lat: 23.0225, lng: 72.5714 }; // Ahmedabad

const parkingLocations = [
  {
    id: 1,
    name: "C.G. Road Parking",
    lat: 23.0276,
    lng: 72.5714,
    capacity: 20,
    filledSlots: 10,
    openingTime: "8:00 AM",
    closingTime: "10:00 PM",
  },
  {
    id: 2,
    name: "AlphaOne Mall Parking",
    lat: 23.0396,
    lng: 72.526,
    capacity: 25,
    filledSlots: 18,
    openingTime: "9:00 AM",
    closingTime: "11:00 PM",
  },
  {
    id: 3,
    name: "Prahlad Nagar Parking",
    lat: 23.0258,
    lng: 72.5074,
    capacity: 15,
    filledSlots: 5,
    openingTime: "7:00 AM",
    closingTime: "9:00 PM",
  },
];

export default function GoogleMapComponent() {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [selectedParking, setSelectedParking] = useState<any>(null);
  const {
    isOpen: isParkingFormOpen,
    onOpen: onParkingFormOpen,
    onOpenChange: onParkingFormOpenChange,
  } = useDisclosure();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    vNumber: "",
  });
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState<any>("opaque");

  const handleSearch = async (event: any) => {
    event.preventDefault();
    const searchQuery = event.target.search.value;

    if (!searchQuery) return;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setMapCenter({ lat: lat(), lng: lng() });

        const filtered = parkingLocations.filter((parking) => {
          const distance = Math.sqrt(
            Math.pow(parking.lat - lat(), 2) + Math.pow(parking.lng - lng(), 2)
          );
          return distance < 0.05; // Approx 5 km radius
        });

        setFilteredMarkers(filtered);
        console.log({ filtered });
      } else {
        alert("Location not found!");
      }
    });
  };

  const handleSlotClick = (index: number) => {
    setSelectedSlot(index);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
    >
      <div className="flex flex-col items-center ">
        <form
          onSubmit={handleSearch}
          className="flex justify-center p-5 items-center w-full  gap-2"
        >
          <Input
            type="text"
            name="search"
            placeholder="Search area..."
            className="border  shadow-lg rounded-md sm:w-2/3 max-sm:w-full"
          />
          <Button
            color="secondary"
            variant="solid"
            type="submit"
            className=" shadow-lg px-4  rounded-md"
          >
            Search
          </Button>
        </form>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={mapCenter}
      >
        {filteredMarkers.map((parking) => (
          <Marker
            key={parking.id}
            position={{ lat: parking.lat, lng: parking.lng }}
            onClick={() => {
              setSelectedParking((prev) =>
                prev?.id === parking.id ? null : parking
              );
              onOpen();
            }}
          />
        ))}

        {selectedParking && (
          <InfoWindow
            position={{ lat: selectedParking.lat, lng: selectedParking.lng }}
            onCloseClick={() => {
              setSelectedParking(null);
              setIsDialogOpen(false);

              onClose();
            }}
          >
            <div>
              <h3 className="text-lg font-bold">{selectedParking.name}</h3>
              <p>Capacity: {selectedParking.capacity}</p>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                onClick={() => setIsDialogOpen(true)}
              >
                Book Now
              </button>
            </div>
          </InfoWindow>
        )}
        <ParkingBookingForm
          isOpen={isParkingFormOpen}
          onOpen={onParkingFormOpen}
          onOpenChange={onParkingFormOpenChange}
        />
      </GoogleMap>

      {isDialogOpen && selectedParking && (
        <Modal
          scrollBehavior="outside"
          backdrop={backdrop}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setSelectedParking(null);
          }}
          placement="bottom"
          //   size="xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="text-xl font-bold mb-3">
                  {selectedParking.name}
                </ModalHeader>
                <div className="flex max-sm:flex-col  sm:pr-8">
                  <ModalBody className="text-sm">
                    <p>
                      <strong>Opening Time:</strong>{" "}
                      {selectedParking.openingTime}
                    </p>
                    <p>
                      <strong>Closing Time:</strong>{" "}
                      {selectedParking.closingTime}
                    </p>
                    <p>
                      <strong>Total Slots:</strong> {selectedParking.capacity}
                    </p>
                    <p>
                      <strong>Filled Slots:</strong>{" "}
                      {selectedParking.filledSlots}
                    </p>
                    <p>
                      <strong>Available Slots:</strong>{" "}
                      {selectedParking.capacity - selectedParking.filledSlots}
                    </p>
                  </ModalBody>

                  <div className="grid grid-cols-5 max-sm:grid-cols-7 m-auto  gap-2 my-3">
                    {Array.from({ length: selectedParking.capacity }).map(
                      (_, index) => (
                        <button
                          type="button"
                          title="Slot"
                          key={index}
                          className={`w-8 h-8 max-sm:w-10 max-sm:h-10 border rounded-md ${
                            index < selectedParking.filledSlots
                              ? "bg-red-500"
                              : selectedSlot === index
                              ? "bg-blue-500"
                              : "bg-green-500"
                          }`}
                          disabled={index < selectedParking.filledSlots}
                          onClick={() => handleSlotClick(index)}
                        ></button>
                      )
                    )}
                  </div>
                </div>
                <ModalFooter>
                  <Button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
                    onPress={onParkingFormOpen}
                  >
                    Continue Booking
                  </Button>

                  <Button
                    className="bg-red-500 text-white px-4 py-2 rounded-md  w-full"
                    onPress={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                </ModalFooter>
                {/* {isBookingConfirmed && (
              <div className="mt-3 p-3 bg-green-100 border border-green-500 rounded-md text-center">
              ✅ Booking Confirmed for Slot #{selectedSlot + 1}!
            </div>
          )} */}
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </LoadScript>
  );
}

import api from "../utils/api";

export const fetchParkingLocations = async () => {
  try {
    const response = await api.get("/parkings");
    return response.data;
  } catch (error) {
    console.error("Error fetching parkings:", error);
    return [];
  }
};

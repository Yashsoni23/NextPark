import api from "../utils/api";

export const fetchUserBookings = async (userId: string) => {
  try {
    const response = await api.get(`/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }
};
export const fetchSingleBooking = async (bookingId: string) => {
  try {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }
};

export const createBooking = async (bookingData: any) => {
  try {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    return null;
  }
};

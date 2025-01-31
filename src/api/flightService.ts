import axios from "axios";

const BASE_URL = "https://flight-status-mock.core.travelopia.cloud/flights";

export const fetchFlights = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching flights.");
  }
};

export const fetchFlightDetails = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching flight details.");
  }
};

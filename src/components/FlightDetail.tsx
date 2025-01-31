import React, { useEffect, useState } from "react";
import { fetchFlightDetails } from "../api/flightService";
import { useParams } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

interface FlightDetailsType {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

const FlightDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [flight, setFlight] = useState<FlightDetailsType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadFlightDetails = async () => {
    if (!id) return;
    try {
      const data = await fetchFlightDetails(id);
      setFlight(data);
      setError(null);
    } catch (err) {
      setError("Failed to load flight details.");
    }
  };

  useEffect(() => {
    loadFlightDetails();
  }, [id]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!flight) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1><u>Flight Details</u></h1>
      <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
      <p><strong>Airline:</strong> {flight.airline}</p>
      <p><strong>Origin:</strong> {flight.origin}</p>
      <p><strong>Destination:</strong> {flight.destination}</p>
      <p><strong>Departure Time:</strong> {flight.departureTime}</p>
      <p><strong>Status:</strong> {flight.status}</p>
    </div>
  );
};

export default FlightDetail;

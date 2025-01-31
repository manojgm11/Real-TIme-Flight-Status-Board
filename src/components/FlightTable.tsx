import React, { useEffect, useState } from "react";
import { fetchFlights } from "../api/flightService";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

const REFRESH_INTERVAL = 10_000;

const FlightTable: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadFlights = async () => {
    try {
      const data = await fetchFlights();
      setFlights(data);
      setError(null);
    } catch (err) {
      setError("Failed to load flight data.");
    }
  };

  useEffect(() => {
    loadFlights();
    const interval = setInterval(() => {
      loadFlights();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  if (error) return <ErrorMessage message={error} />;

  return (
    <table>
      <thead>
        <tr>
          <th>Flight No</th>
          <th>Airline</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Departure Time</th>
          <th>Status</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((flight) => (
          <tr key={flight.id} data-testid="flight-row">
            <td>{flight.flightNumber}</td>
            <td>{flight.airline}</td>
            <td>{flight.origin}</td>
            <td>{flight.destination}</td>
            <td>{flight.departureTime}</td>
            <td>{flight.status}</td>
            <td>
              <Link to={`/flights/${flight.id}`}>View</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlightTable;

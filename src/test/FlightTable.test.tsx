import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import FlightTable from "../components/FlightTable";
import * as flightService from "../api/flightService";
import { BrowserRouter } from "react-router-dom";

jest.mock("../api/flightService");

const mockFlights = [
  {
    id: "1",
    flightNumber: "AA123",
    airline: "American Airlines",
    origin: "JFK",
    destination: "LAX",
    departureTime: "10:00",
    status: "On Time"
  },
  {
    id: "2",
    flightNumber: "UA456",
    airline: "United Airlines",
    origin: "SFO",
    destination: "ORD",
    departureTime: "11:30",
    status: "Delayed"
  }
];

describe("FlightTable", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders flight data from API", async () => {
    // @ts-ignore
    flightService.fetchFlights.mockResolvedValue(mockFlights);

    render(
      <BrowserRouter>
        <FlightTable />
      </BrowserRouter>
    );

    await waitFor(() => {
      const rows = screen.getAllByTestId("flight-row");
      expect(rows).toHaveLength(2);
    });

    expect(screen.getByText(/AA123/i)).toBeInTheDocument();
    expect(screen.getByText(/American Airlines/i)).toBeInTheDocument();
    expect(screen.getByText(/UA456/i)).toBeInTheDocument();
  });

  test("shows error message if API fails", async () => {
    // @ts-ignore
    flightService.fetchFlights.mockRejectedValue(new Error("API Error"));

    render(
      <BrowserRouter>
        <FlightTable />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to load flight data/i)).toBeInTheDocument();
    });
  });
});
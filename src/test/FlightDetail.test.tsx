import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import FlightDetail from "../components/FlightDetail";
import * as flightService from "../api/flightService";

jest.mock("../api/flightService");

const mockFlightDetails = {
  id: "1",
  flightNumber: "AA123",
  airline: "American Airlines",
  origin: "JFK",
  destination: "LAX",
  departureTime: "10:00",
  status: "On Time",
};

describe("FlightDetail", () => {
  beforeEach(() => {
    // @ts-ignore
    flightService.fetchFlightDetails.mockResolvedValue(mockFlightDetails);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders flight details", async () => {
    render(
      <MemoryRouter initialEntries={["/flights/1"]}>
        <Routes>
          <Route path="/flights/:id" element={<FlightDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Check for loading initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the flight detail to load
    await waitFor(() => {
      expect(screen.getByText(/flight details/i)).toBeInTheDocument();
      expect(screen.getByText(/AA123/i)).toBeInTheDocument();
      expect(screen.getByText(/american airlines/i)).toBeInTheDocument();
    });
  });

  test("displays error message if flight details cannot be fetched", async () => {

    // @ts-ignore
    flightService.fetchFlightDetails.mockRejectedValueOnce(new Error("API Error"));

    render(
      <MemoryRouter initialEntries={["/flights/2"]}>
        <Routes>
          <Route path="/flights/:id" element={<FlightDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to load flight details/i)).toBeInTheDocument();
    });
  });
});

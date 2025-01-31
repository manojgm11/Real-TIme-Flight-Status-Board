import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlightDetails from "./pages/FlightDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights/:id" element={<FlightDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

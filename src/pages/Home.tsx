import React from "react";
import FlightTable from "../components/FlightTable";

const Home: React.FC = () => {
  return (
    <div><center>
      <header>
        <h1>Real-Time Flight Status Board</h1>
      </header>
      <main>
        <FlightTable />
      </main>
      <footer>
        <p>
          <b>Powered by </b><a href="https://flight-status-mock.core.travelopia.cloud/flights">Flight Tracker API</a>
        </p>
      </footer>
      </center>
    </div>
  );
};
export default Home;

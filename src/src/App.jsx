import React, { useState, useEffect } from "react";
import FlightCard from "./Components/FlightCard";
import Header from "./Components/Header";
import FlightMap from "./Components/FlightMap";
import FlightDensity from "./Components/FlightDensity";
import SideBar from "./Components/SideBar";
import "./App.css";

/**
 * Loads the flight data from the json file.
 * @param {String} filePath
 * @returns {Promise<>}
 */
const loadFlights = async (filePath) => {
  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching flights: ${error}`);
    throw error;
  }
};

function App() {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const [settings, setSettings] = useState({
    imageryURL: "mapbox://styles/mapbox/streets-v12",
    lineOpacity: 1,
    lineWidth: 1.5,
    mapKey: null,
  });

  const [filters, setFilters] = useState({
    operator: null,
    flightContext: null,
    planeType: null,
    planeRegistration: null,
    date: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadFlights("/data.json");
        setFlights(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onFilterChange = (newFilters) => {
    setSelectedFlight(null);
    setFilters(newFilters);
  };

  const onSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  const onFlightSelected = (flight) => {
    setSelectedFlight(flight);
  };

  return (
    <>
      <Header />
      {loading && <p>Loading flights...</p>}
      {error && <p>Error loading flights: {error.message}</p>}
      {!loading && !error && (
        <>
          {!settings.mapKey && (
            <p>Please provide a Mapbox API key in the settings.</p>
          )}
          <SideBar
            flights={flights}
            onFilterChange={onFilterChange}
            onSettingsChange={onSettingsChange}
          />
          {settings.mapKey && (
            <>
              <FlightDensity />
              <FlightMap
                flights={flights}
                filters={filters}
                settings={settings}
                onFlightClicked={onFlightSelected}
              />
              {selectedFlight && <FlightCard {...selectedFlight} />}
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;

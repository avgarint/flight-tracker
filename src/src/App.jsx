import React, { useState, useEffect } from "react";
import FlightCard from "./Components/FlightCard";
import Header from "./Components/Header";
import FilterPanel from "./Components/FilterPanel";
import SettingsPanel from "./Components/SettingsPanel";
import FlightMap from "./Components/FlightMap";
import FlightDensity from "./Components/FlightDensity";
import SideBar from "./Components/SideBar";
import "./App.css";

/**
 * Loads the flight data from the json file.
 * @param {String} filePath
 * @returns {Promise<Object>}
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
  const [showSettings, setShowSettings] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Default filters
  const [filters, setFilters] = useState({
    operator: null,
    flightContext: null,
    planeType: null,
    planeRegistration: null,
    date: null,
  });

  // Default settings
  const [settings, setSettings] = useState({
    imageryURL: "mapbox://styles/mapbox/streets-v12",
    lineOpacity: 1,
    lineWidth: 1.5,
    mapKey: null,
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

  const toggleFilters = () => {
    setShowSettings(false);
    setShowFilters(!showFilters);
  };

  const toggleSettings = () => {
    setShowFilters(false);
    setShowSettings(!showSettings);
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
          <FlightDensity />
          <SideBar
            onFilterToggle={toggleFilters}
            onSettingToggle={toggleSettings}
          />
          {showFilters && (
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              flights={flights}
            />
          )}
          {showSettings && (
            <SettingsPanel settings={settings} onSettingsChange={setSettings} />
          )}
          {settings.mapKey ? (
            <FlightMap
              flights={flights}
              filters={filters}
              settings={settings}
              onFlightClicked={onFlightSelected}
            />
          ) : (
            <p>Please provide a Mapbox API key in the settings.</p>
          )}
          {selectedFlight && <FlightCard {...selectedFlight} />}
        </>
      )}
    </>
  );
}

export default App;

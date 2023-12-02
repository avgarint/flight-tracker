import { useState } from "react";
import FilterPanel from "./FilterPanel";
import SettingsPanel from "./SettingsPanel";

/**
 * The app side bar is a section from where the user can access
 * filtering and app settings.
 * @param {Array} flights - A collection of JSON flights to be rendered
 * @param {Function} onFilterChange - A callback invoked when a filter changes
 * @param {Function} onSettingsChange - A callback invoked when a setting changes
 * @returns
 */
const SideBar = ({ flights, onFilterChange, onSettingsChange }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  /**
   * Either opens or closes the filter panel based on
   * current state.
   */
  const toggleFilters = () => {
    setShowSettings(false);
    setShowFilters(!showFilters);
  };

  /**
   * Either opens or closes the settings panel based on
   * current state.
   */
  const toggleSettings = () => {
    setShowFilters(false);
    setShowSettings(!showSettings);
  };

  return (
    <div>
      <nav className="app-sidebar">
        <button onClick={toggleFilters}>
          <img src="./src/assets/filter.svg" alt="Filter" />
          <span>Filter</span>
        </button>
        <button onClick={toggleSettings}>
          <img src="./src/assets/gear.svg" alt="Gear" />
          <span>Settings</span>
        </button>
        <button>
          <img src="./src/assets/info.svg" alt="Info" />
          <span>Info</span>
        </button>
      </nav>
      <div style={{ display: showSettings ? "block" : "none" }}>
        <SettingsPanel onSettingsChange={onSettingsChange} />
      </div>
      <div style={{ display: showFilters ? "block" : "none" }}>
        <FilterPanel flights={flights} onFilterChange={onFilterChange} />
      </div>
    </div>
  );
};

export default SideBar;

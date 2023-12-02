import { useState } from "react";

/**
 * The app side bar is a section from where the user can access
 * filtering and app settings.
 * @param {Array} flights - A collection of JSON flights to be rendered
 */
const SideBar = ({ onFilterToggle, onSettingToggle }) => {
  return (
    <>
      <nav className="app-sidebar">
        <button onClick={onFilterToggle}>
          <img src="./src/assets/filter.svg" alt="Filter" />
          <span>Filter</span>
        </button>
        <button onClick={onSettingToggle}>
          <img src="./src/assets/gear.svg" alt="Gear" />
          <span>Settings</span>
        </button>
        <button>
          <img src="./src/assets/info.svg" alt="Info" />
          <span>Info</span>
        </button>
      </nav>
    </>
  );
};

export default SideBar;

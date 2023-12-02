import React, { useState, useEffect } from "react";
import Select from "react-select";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

/**
 * Renders the filter panel which allows for filtering
 * @param {Array} flights
 * @param {Function} onFilterChange
 */
const FilterPanel = ({ flights, onFilterChange }) => {
  // Unique values for filters
  const [uniqueValues, setUniqueValues] = useState({
    operator: [],
    flightContext: [],
    planeType: [],
    planeRegistration: [],
  });

  // Current selected filters
  const [filters, setFilters] = useState({
    operator: null,
    flightContext: null,
    planeType: null,
    planeRegistration: null,
    date: null,
  });

  /**
   *
   */
  const generateOptions = (items) =>
    items.map((item) => ({ label: item, value: item }));

  /**
   * Creates a filter select.
   */
  const createSelect = (property) => (
    <Select
      placeholder={property}
      isClearable={true}
      options={generateOptions(uniqueValues[property])}
      onChange={(selectedOption) =>
        handleFilterChange(property, selectedOption?.value)
      }
    />
  );

  /**
   * Invoked when one of the filter changes.
   */
  const handleFilterChange = (filterKey, selectedValue) => {
    const updatedFilters = { ...filters, [filterKey]: selectedValue };
    onFilterChange(updatedFilters);
    setFilters(updatedFilters);
  };

  /**
   * Clear the date filter, visually resests the calendar to
   * no selected date value.
   */
  const clearDate = () => {
    const updatedFilters = { ...filters, date: null };
    onFilterChange(updatedFilters);
    setFilters(updatedFilters);
  };

  useEffect(() => {
    if (flights.length > 0) {
      const extractUniqueValues = (property) => [
        ...new Set(flights.map((flight) => flight[property]).filter(Boolean)),
      ];

      setUniqueValues({
        operator: extractUniqueValues("operator"),
        flightContext: extractUniqueValues("flightContext"),
        planeType: extractUniqueValues("planeType"),
        planeRegistration: extractUniqueValues("registration"),
      });
    }
  }, [flights]);

  return (
    <div className="filter-panel">
      <header className="filter-panel-header">
        <h2>Filters</h2>
      </header>
      <div className="filter-panel-content">
        {Object.keys(uniqueValues).map((property) => (
          <React.Fragment key={property}>
            {uniqueValues[property].length > 0 && createSelect(property)}
          </React.Fragment>
        ))}
        <Calendar
          value={filters.date}
          onChange={(selectedDate) =>
            handleFilterChange(
              "date",
              selectedDate ? selectedDate.toLocaleDateString("en-CA") : null
            )
          }
        />
        <button className="clear-date" onClick={clearDate}>
          Clear date
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;

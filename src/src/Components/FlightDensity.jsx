/**
 * Creates the flight density bar which is an indication
 * to help determine the density of each route.
 */
const FlightDensity = () => {
  return (
    <div className="route-density-bar">
      <h4 className="route-density-low">Low</h4>
      <h4 className="route-density-high">High</h4>
    </div>
  );
};

export default FlightDensity;

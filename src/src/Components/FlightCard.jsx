/**
 * Creates a flight card which is the main data overlay to see data
 * linked to a flight.
 */
const FlightCard = ({
  flightNumber,
  operator,
  flightContext,
  twitterLink,
  trackerLink,
  planeImageUrl,
  planeImageCredits,
  planeType,
  registration,
  date,
  route,
}) => {
  return (
    <div className="flight-card">
      <header className="flight-info-header">
        <h2 className="flight-number">{flightNumber}</h2>
        <h2 className="flight-operator">{operator}</h2>
        {flightContext !== "" && (
          <h2 className="flight-context">{flightContext}</h2>
        )}
        <div className="extra-links">
          {twitterLink !== "" && (
            <a className="twitter-link" href={twitterLink} target="_blank">
              Twitter link
            </a>
          )}
          {trackerLink !== "" && (
            <a className="tracker-link" href={trackerLink} target="_blank">
              Tracker link
            </a>
          )}
        </div>
      </header>
      <img
        className="plane-thumbnail"
        src={planeImageUrl}
        alt={`Plane picture for flight ${flightNumber}`}
      />
      <h4 className="plane-thumbnail-credits">© {planeImageCredits}</h4>
      <div className="flight-data">
        <span>Plane type:</span>
        <h3 className="flight-data-plane-type">{planeType}</h3>
        <span>Plane registration:</span>
        <h3 className="flight-data-plane-registration">{registration}</h3>
        <span>Flight date:</span>
        <h3 className="flight-data-date">{date}</h3>
        <span>Flight route:</span>
        <h3 className="flight-data-route">{route}</h3>
      </div>
    </div>
  );
};

export default FlightCard;

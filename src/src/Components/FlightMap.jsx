import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { calculateFlightCounts, getRouteColor } from "../Utils";

/**
 * The main flight map rendering every routes and flights.
 * @param {Array} flights - A collection of JSON flights to be rendered
 * @param {Object} filters
 * @param {Object} settings
 * @param {Function} onFlightClicked
 */
const FlightMap = ({ flights, filters, settings, onFlightClicked }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapConfig, setMapConfig] = useState({
    center: [0, 0],
    zoom: 0,
  });

  useEffect(() => {
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    mapboxgl.accessToken = settings.mapKey;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: settings.imageryURL,
      center: mapConfig.center,
      zoom: mapConfig.zoom,
    });

    map.current.on("moveend", handleMoveEnd);

    map.current.on("style.load", () => {
      renderRoutes();
      map.current.on("click", handleClick);
    });
  }, [flights, filters, settings]);

  /**
   * Clears the map layer. The route layer is removed.
   */
  const clearMap = () => {
    if (map.current.getSource("grouped-routes")) {
      map.current.removeLayer("grouped-routes-layer");
      map.current.removeSource("grouped-routes");
    }
  };

  /**
   * Returns ``true`` if the flight should be rendererd, meaning
   * not filtered by the user, and ``false`` if not.
   */
  const shouldRenderFlight = (flight) => {
    return (
      (!filters.operator || flight.operator === filters.operator) &&
      (!filters.flightContext ||
        flight.flightContext === filters.flightContext) &&
      (!filters.planeType || flight.planeType === filters.planeType) &&
      (!filters.planeRegistration ||
        flight.registration === filters.planeRegistration) &&
      (!filters.date || flight.date === filters.date)
    );
  };

  /**
   * Renders the flight routes. This takes in accound filters
   * and filterings.
   */
  const renderRoutes = () => {
    clearMap();

    // Create a GeoJSON object to store grouped routes
    const groupedRoutes = {
      type: "FeatureCollection",
      features: [],
    };

    const flightCounts = calculateFlightCounts(flights);

    flights.forEach((flight, index) => {
      if (shouldRenderFlight(flight)) {
        const count = flightCounts[flight.route];
        const lineColor = getRouteColor("green", "red", count);

        groupedRoutes.features.push({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: flight.coordinates,
          },
          properties: {
            name: flight.route,
            flightIndex: index,
            flightCount: flightCounts,
            lineColor: lineColor,
          },
        });
      }
    });

    // Add the groupedRoutes GeoJSON as a source and layer to the map
    if (map.current) {
      map.current.addSource("grouped-routes", {
        type: "geojson",
        data: groupedRoutes,
      });

      map.current.addLayer({
        id: "grouped-routes-layer",
        type: "line",
        source: "grouped-routes",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": ["get", "lineColor"],
          "line-width": settings.lineWidth || 1.5,
          "line-opacity": settings.lineOpacity || 1.0,
        },
      });
    }
  };

  /**
   * Invoked after when the user moves around the map.
   */
  const handleMoveEnd = () => {
    setMapConfig({
      center: map.current.getCenter().toArray(),
      zoom: map.current.getZoom(),
    });
  };

  /**
   * Invoked when the user clicks on the map.
   */
  const handleClick = (event) => {
    const features = map.current.queryRenderedFeatures(event.point, {
      layers: ["grouped-routes-layer"],
    });

    if (features.length > 0) {
      const clickedFeature = features[0].properties;
      const clickedFlightIndex = clickedFeature.flightIndex;

      // Ensure the clickedFlightIndex is within bounds
      if (clickedFlightIndex >= 0 && clickedFlightIndex < flights.length) {
        const clickedFlight = flights[clickedFlightIndex];
        onFlightClicked(clickedFlight);
      }
    }
  };

  return (
    <>
      <div ref={mapContainer} className="map-container"></div>
    </>
  );
};

export default FlightMap;

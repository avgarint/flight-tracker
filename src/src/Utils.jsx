import tinygradient from "tinygradient";

/**
 * Returns an object containing the flight counts for every
 * routes.
 * @param {Array} flights
 * @returns
 */
export function calculateFlightCounts(flights) {
  let counts = {};

  flights.forEach((flight) => {
    const key = flight.route;

    if (counts[key]) {
      counts[key]++;
    } else {
      counts[key] = 1;
    }
  });

  return counts;
}

/**
 * Returns an appropriate route color between start and end color
 * and on count.
 * @param {String} startColor
 * @param {String} endColor
 * @param {Number} count
 * @returns
 */
export function getRouteColor(startColor, endColor, count) {
  const normalizedCount = Math.min(1, Math.max(0, count / 10));

  const gradient = tinygradient(startColor, endColor);
  const color = gradient.rgbAt(normalizedCount).toRgbString();

  return color;
}

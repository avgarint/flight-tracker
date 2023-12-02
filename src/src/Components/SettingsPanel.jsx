import { useEffect } from "react";

/**
 * An array of available imagery for the map.
 */
const availableImagery = [
  {
    name: "Streets",
    img: "../src/assets/streets.png",
    url: "mapbox://styles/mapbox/streets-v12",
  },
  {
    name: "Outdoors",
    img: "../src/assets/streets.png",
    url: "mapbox://styles/mapbox/outdoors-v12",
  },
  {
    name: "Light",
    img: "../src/assets/light.png",
    url: "mapbox://styles/mapbox/light-v11",
  },
  {
    name: "Dark",
    img: "../src/assets/dark.png",
    url: "mapbox://styles/mapbox/dark-v11",
  },
  {
    name: "Satellite",
    img: "../src/assets/satellite.png",
    url: "mapbox://styles/mapbox/satellite-v9",
  },
  {
    name: "Satellite Streets",
    img: "../src/assets/satellite-streets.png",
    url: "mapbox://styles/mapbox/satellite-streets-v12",
  },
  {
    name: "Navigation Day",
    img: "../src/assets/navigation-day.png",
    url: "mapbox://styles/mapbox/navigation-day-v1",
  },
  {
    name: "Navigation Night",
    img: "../src/assets/navigation-night.png",
    url: "mapbox://styles/mapbox/navigation-night-v1",
  },
];

/**
 * The user settings panel contains parameters that can be
 * changed by the user such as map style and visibility settings.
 * @param {Object} settings - Settings to be rendered
 * @param {Function} onSettingsChange - A callback invoked when a setting changes
 */
const SettingsPanel = ({ settings, onSettingsChange }) => {
  useEffect(() => {
    const savedSettings = localStorage.getItem(
      "pilot-alex-flight-tracker-settings"
    );

    if (savedSettings !== null) {
      onSettingsChange(JSON.parse(savedSettings));
    }
  }, []);

  /**
   * Overwrites the previous settings with ``newSettings``.
   * The callback ``onSettingsChange`` is called.
   */
  const updateSettings = (newSettings) => {
    onSettingsChange((prevSettings) => {
      const updatedSettings = {
        ...prevSettings,
        ...newSettings,
      };

      localStorage.setItem(
        "pilot-alex-flight-tracker-settings",
        JSON.stringify(updatedSettings)
      );

      return updatedSettings;
    });
  };

  return (
    <div className="settings-panel">
      <header className="settings-panel-header">
        <h2>Settings</h2>
      </header>
      <div className="settings-panel-content">
        <section>
          <h3>Map style</h3>
          <div className="map-style-grid">
            {availableImagery.map((style) => (
              <button
                key={style.name}
                onClick={() => updateSettings({ imageryURL: style.url })}
              >
                <img src={style.img} alt={style.name} />
                <span>{style.name}</span>
              </button>
            ))}
          </div>
        </section>
        <hr />
        <section>
          <h3>Visibility</h3>
          <div className="visibility">
            <label htmlFor="line-opacity-slider">Map line opacity</label>
            <input
              id="line-opacity-slider"
              type="range"
              min={0.1}
              max={1.0}
              step={0.1}
              value={settings.lineOpacity}
              onChange={(event) =>
                updateSettings({ lineOpacity: parseFloat(event.target.value) })
              }
            />
            <label htmlFor="line-witdh-slider">Map line width</label>
            <input
              id="line-width-slider"
              type="range"
              min={1.0}
              max={10.0}
              step={1.0}
              value={settings.lineWidth}
              onChange={(event) =>
                updateSettings({ lineWidth: parseFloat(event.target.value) })
              }
            />
          </div>
        </section>
        <hr />
        <section>
          <h3>Key configuration</h3>
          <div className="configuration">
            <input
              id="mapbox-api-key"
              type="text"
              placeholder="Mapbox API key"
              min={0}
              max={200}
              value={settings.mapKey === null ? "" : settings.mapKey}
              onChange={(event) =>
                updateSettings({ mapKey: event.target.value })
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPanel;

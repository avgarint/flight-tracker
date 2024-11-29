# flight-tracker
Tracking software to archive and visualize flights.

<p align="center">
        <img src="https://github.com/AlexandreAero/flight-tracker/assets/66020831/4528eced-8fae-4597-9b16-7e0ca708f0ac" width="738px" />
</p>

## Libraries
- ``mapbox-gl``: [npm](https://www.npmjs.com/package/mapbox-gl) or [Github repository](https://github.com/mapbox/mapbox-gl-js)
- ``react``: [npm](https://www.npmjs.com/package/react) or [Github repository](https://github.com/facebook/react)
- ``react-calendar``: [npm](https://www.npmjs.com/package/react-calendar) or [Github repository](https://github.com/wojtekmaj/react-calendar)
- ``react-select``: [npm](https://www.npmjs.com/package/react-select) or [Github repository](https://github.com/JedWatson/react-select/tree/master)
- ``tinygradient``: [npm](https://www.npmjs.com/package/tinygradient) or [Github repository](https://github.com/mistic100/tinygradient)

## Usage
To add a flight simply add a json entry in the ``data.json`` file located in the public folder:
```json
{
        "planeImageUrl": "...",
        "planeImageCredits": "...",
        "trackerLink": "...",
        "flightNumber": "...",
        "planeType": "...",
        "operator": "...",
        "flightContext": "...",
        "date": "...",
        "registration": "...",
        "route": "...",
        "coordinates": [
            [
            ],
            [
            ]
        ]
    }
```

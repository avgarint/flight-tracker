<h1 align="center">flight-tracker</h1>

![GitHub last commit](https://img.shields.io/github/last-commit/alexandreaero/flight-tracker)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/alexandreaero/flight-tracker)
![Lines of code](https://img.shields.io/tokei/lines/github/alexandreaero/flight-tracker)

### A flight tracker developed to archive flights for OSINT

## Screenshots
![image](https://github.com/AlexandreAero/flight-tracker/assets/66020831/4528eced-8fae-4597-9b16-7e0ca708f0ac)

## Used librairies
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

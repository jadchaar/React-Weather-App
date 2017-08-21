// https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/

const NodeGeocoder = require('node-geocoder');
require('dotenv').config();
const express = require('express');
const urljoin = require('url-join');
const app = express();
const fetch = require('node-fetch');
const {
  checkResponseStatus
} = require('./helpers');

// Get port for server from arguments
const listenPort = process.argv[2] ? parseInt(process.argv[2], 10) : 3001;

app.get('/api/react-weather/coordinates', (req, res) => {
  // Obtain location search from query string
  const {
    location
  } = req.query;
  getLatLon(location)
    .then(result => {
      return result.length ? res.json({
        lat: result[0].latitude,
        lon: result[0].longitude
      }) : res.send('No results');
    })
    .catch(err => res.status(500).send(`An error has occured: ${err}`));
});

app.get('/api/react-weather/weather', (req, res) => {
  const {
    lat,
    lon
  } = req.query;
  const {
    DARK_SKY_API_KEY
  } = process.env;
  const DARK_SKY_API_URL = urljoin('https://api.darksky.net/forecast', DARK_SKY_API_KEY, `${lat},${lon}`);
  // https://darksky.net/dev/docs/forecast
  fetch(DARK_SKY_API_URL)
    .then(checkResponseStatus)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(`An error has occured: ${err}`));
});

app.listen(listenPort, () => console.log(`react-weather-app server listening on port ${listenPort}!`));

// Takes a location input and returns a json of location info
const getLatLon = location => {
  const {
    GOOG_MAPS_GEOCODING_API_KEY
  } = process.env;
  const geocoder = NodeGeocoder({
    provider: 'google',
    httpAdapter: 'https',
    apiKey: GOOG_MAPS_GEOCODING_API_KEY
  });
  return geocoder.geocode(location);
};

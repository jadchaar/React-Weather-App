/* eslint no-console: 0 */

// https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/

const NodeGeocoder = require('node-geocoder');
require('dotenv').config();
const express = require('express');
const app = express();

// Get port for server from arguments
const listenPort = process.argv[2] ? parseInt(process.argv[2], 10) : 3001;

app.get('/api/react-weather', (req, res) => {
  // Obtain location search from query string
  getLatLon(req.query.location)
    .then(resolve => resolve.length ? res.json(resolve) : res.send('No results'))
    .catch(err => res.status(500).send(`An error has occured: ${err}`));
});

// app.listen(listenPort, () => console.log('react-weather-app server listening on port %s!', listenPort));
app.listen(listenPort, () => console.log(`react-weather-app server listening on port ${listenPort}!`));

// Takes a location input and returns a json of location info
const getLatLon = location => {
  return new Promise((resolve, reject) => {
    const GEO_API_KEY = process.env.GOOG_MAPS_GEOCODING_API_KEY;

    const options = {
      provider: 'google',
      httpAdapter: 'https',
      apiKey: GEO_API_KEY
    };

    const geocoder = NodeGeocoder(options);

    geocoder.geocode(location)
      .then(res => resolve(res))
      .catch(err => {
        reject(err);
        return;
      });
  });
};

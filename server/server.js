/* eslint no-console: 0 */

const NodeGeocoder = require('node-geocoder');
require('dotenv').config();
const prompt = require('prompt');

const GEO_API_KEY = process.env.GOOG_MAPS_GEOCODING_API_KEY;
console.log('API key:', GEO_API_KEY);

prompt.start();

prompt.get(['location'], (err, result) => {
  console.log('  location:', result.location);
  geocoder.geocode(result.location)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: GEO_API_KEY
};

const geocoder = NodeGeocoder(options);

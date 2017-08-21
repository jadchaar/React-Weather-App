import querystring from 'querystring';
import _ from 'lodash/core';

export const checkResponseStatus = res => {
  if (res.ok) return res.json();
  throw new Error(`Network response was not ok: ${res.statusText} (${res.status})`);
};

export const getWeatherData = (_lat, _lon) => {
  const qs = generateQueryString({
    lat: _lat,
    lon: _lon
  });
  return fetch(`/api/react-weather/weather?${qs}`, {
      mode: 'cors'
    })
    .then(checkResponseStatus)
    .catch(err => console.error(`There has been a problem with the fetch operation: ${err.message}`));
};

export const filterBasicCurrentWeatherData = data => {
  return JSON.stringify(_.pick(data, ['windSpeed', 'humidity', 'dewPoint', 'uvIndex', 'visibility', 'pressure']));
};

export const generateQueryString = obj => {
  return querystring.stringify(obj);
};

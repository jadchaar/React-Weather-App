import querystring from 'querystring';
// import _ from 'lodash/core';

export const checkResponseStatus = res => {
  // TODO: Handle No Content responses
  if (res.ok) return res.json();
  throw new Error(`Network response was not ok: ${res.statusText} (${res.status})`);
};

export const getBasicCurrentWeatherData = (_lat, _lon) => {
  const qs = generateQueryString({
    lat: _lat,
    lon: _lon
  });
  return fetch(`/api/react-weather/weather?${qs}`, {
      mode: 'cors'
    })
    .then(checkResponseStatus)
    .then(res => filterData(res))
    .catch(err => console.error(`There has been a problem with the fetch operation: ${err.message}`));
};

const filterData = (res) => {
  const {
    summary,
    icon,
    temperature,
    apparentTemperature,
    windSpeed,
    humidity,
    dewPoint,
    uvIndex,
    visibility,
    pressure
  } = res.currently;
  return {
    summary,
    icon,
    temperature,
    apparentTemperature,
    windSpeed,
    humidity,
    dewPoint,
    uvIndex,
    visibility,
    pressure,
    hourSummary: res.hourly.summary,
    dailySummary: res.daily.summary
  };
};

export const generateQueryString = obj => {
  return querystring.stringify(obj);
};

export const getObjSize = obj => Object.keys(obj).length;

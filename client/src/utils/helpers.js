import querystring from 'querystring';
// import _ from 'lodash/core';

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

export const getBasicCurrentWeatherData = (_lat, _lon) => {
  const qs = generateQueryString({
    lat: _lat,
    lon: _lon
  });
  return fetch(`/api/react-weather/weather?${qs}`, {
      mode: 'cors'
    })
    .then(checkResponseStatus)
    // .then(res => _.pick(res.currently, ['windSpeed', 'humidity', 'dewPoint', 'uvIndex', 'visibility', 'pressure']))
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
    minuteSummary: res.minutely.summary
  };
};

export const generateQueryString = obj => {
  return querystring.stringify(obj);
};

export const getObjSize = obj => Object.keys(obj).length;

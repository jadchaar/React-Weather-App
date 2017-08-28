import querystring from 'querystring';
import mapValues from 'lodash/mapValues';

export const checkResponseStatus = res => {
  // TODO: Handle No Content responses
  // if (res.ok) return res.json();
  console.log(res);
  if (res.ok) {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return res.json();
    } else if (contentType && contentType.includes('text/html')) {
      return res.text();
    } else {
      throw new Error(`Unknown response error: ${res.statusText} (${res.status})`);
    }
  }
  throw new Error(`Network response was not ok: ${res.statusText} (${res.status})`);
};

export const getBasicCurrentWeatherData = (_lat, _lon) => {
  const qs = generateQueryString({
    lat: _lat,
    lon: _lon,
  });
  return fetch(`/api/react-weather/weather?${qs}`, {
      mode: 'cors'
    })
    .then(checkResponseStatus)
    .then(res => filterData(res))
    .then(res => roundVals(res))
    // .catch(err => console.error(`There has been a problem with the fetch operation: ${err.message}`));
    .catch(err => {
      return console.error(`There has been a problem with the fetch operation: ${err.message}`);
    });
};

const filterData = (res) => {
  const {
    summary: currentSummary,
    icon,
    temperature,
    apparentTemperature,
    windSpeed,
    humidity,
    dewPoint,
    uvIndex,
    visibility,
    pressure,
  } = res.currently;
  const {
    summary: hourSummary,
  } = res.hourly;
  const {
    summary: dailySummary,
  } = res.daily;
  return {
    currentSummary,
    hourSummary,
    dailySummary,
    icon,
    temperature,
    apparentTemperature,
    windSpeed,
    humidity,
    dewPoint,
    uvIndex,
    visibility,
    pressure,
  };
};

const roundVals = (res) => {
  res.humidity *= 100;
  return mapValues(res, (val) => typeof val === 'number' ? Math.round(val) : val);
};

export const generateQueryString = obj => {
  return querystring.stringify(obj);
};

export const getObjSize = obj => Object.keys(obj).length;

export const imperialUnits = {
  speed: 'mph',
  percent: '%',
  degrees: '˚',
  degreesF: '˚F',
  degreesC: '˚C',
  distance: 'mi',
  plusDistance: '+ mi',
  pressure: 'mb',
  timePM: 'pm',
  timeAM: 'am'
};

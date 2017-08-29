import querystring from 'querystring';
import mapValues from 'lodash/mapValues';
import Sun from '../images/climacons/Sun.svg';
import Moon from '../images/climacons/Moon.svg';
import Rain from '../images/climacons/Cloud-Rain.svg';
import Snow from '../images/climacons/Cloud-Snow.svg';
import Hail from '../images/climacons/Cloud-Hail.svg';
import Wind from '../images/climacons/Wind.svg';
import Fog from '../images/climacons/Cloud-Fog.svg';
import Cloud from '../images/climacons/Cloud.svg';
import CloudSun from '../images/climacons/Cloud-Sun.svg';
import CloudMoon from '../images/climacons/Cloud-Moon.svg';
import Lightning from '../images/climacons/Cloud-Lightning.svg';
import Tornado from '../images/climacons/Tornado.svg';
import Shades from '../images/climacons/Shades.svg';

export const checkResponseStatus = res => {
  // TODO: Handle No Content responses
  // if (res.ok) return res.json();
  // console.log(res);
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

export const determineIcon = (icon) => {
  switch (icon) {
    case 'clear-day':
      return Sun;
    case 'clear-night':
      return Moon;
    case 'rain':
      return Rain;
    case 'snow':
      return Snow;
    case 'sleet':
      return Hail;
    case 'wind':
      return Wind;
    case 'fog':
      return Fog;
    case 'cloudy':
      return Cloud;
    case 'partly-cloudy-day':
      return CloudSun;
    case 'partly-cloudy-night':
      return CloudMoon;
    case 'hail':
      return Hail;
    case 'thunderstorm':
      return Lightning;
    case 'tornado':
      return Tornado;    
    default:
      return Shades;
  }
};
import dispatcher from '../dispatcher';

export const getWeatherForLocation = (lat, lon) => {
  dispatcher.dispatch({
    type: 'GET_WEATHER_FOR_LAT_LON',
    lat,
    lon
  });
};

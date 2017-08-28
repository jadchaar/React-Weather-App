import dispatcher from '../dispatcher';

export const getWeatherForLocation = (lat, lon) => new Promise((resolve, reject) => {
  try {
    dispatcher.dispatch({
      type: 'GET_WEATHER_FOR_LAT_LON',
      lat,
      lon
    });
    resolve();
  } catch (err) {
    reject(`Dispatch failed: ${err}`);
  }
});

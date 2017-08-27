import {
  EventEmitter
} from 'events';
import {
  getBasicCurrentWeatherData,
  getObjSize
} from '../utils/helpers';
import dispatcher from '../dispatcher';

// React Flux Tutorial: https://youtu.be/MZfCVq5iCBw

class WeatherStore extends EventEmitter {
  constructor(props) {
    super(props);

    this.weather = {
      summary: null,
      icon: null,
      temperature: null,
      apparentTemperature: null,
      windSpeed: null,
      humidity: null,
      dewPoint: null,
      uvIndex: null,
      visibility: null,
      pressure: null,
      hourSummary: null,
      dailySummary: null
    };
  }

  getWeatherForLatLon(lat, lon) {
    if (!lat || !lon) return console.error('Latitude or longitude is undefined!');
    return getBasicCurrentWeatherData(lat, lon)
      .then(res => {
        if (typeof this.weather !== typeof res || getObjSize(res) !== getObjSize(this.weather)) throw new Error('Objects incompatible.');
        this.weather = res;
        this.emit('change');
      })
      .catch(err => console.error(`There has been a problem obtaining basic weather info: ${err.message}`));
  }

  getWeather() {
    return this.weather;
  }

  handleAction(action) {
    const {
      type,
      lat,
      lon
    } = action;

    switch (type) {
      case 'GET_WEATHER_FOR_LAT_LON':
        this.getWeatherForLatLon(lat, lon);
        break;
      case 'REFRESH_WEATHER_FOR_LAT_LON':

        break;
      default:
        console.log(`Action type ${type} is invalid.`);
    }
  }
}

const weatherStore = new WeatherStore();
dispatcher.register(weatherStore.handleAction.bind(weatherStore));
// window.dispatcher = dispatcher; // NOTE: For testing
// window.weatherStore = weatherStore; // NOTE: For testing
export default weatherStore;

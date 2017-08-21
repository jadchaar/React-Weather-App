import {
  EventEmitter
} from 'events';
import {
  getBasicCurrentWeatherData
} from '../utils/helpers';

// React Flux Tutorial: https://youtu.be/MZfCVq5iCBw

class WeatherStore extends EventEmitter {
  constructor(props) {
    super(props);

    this.weather = {
      'windSpeed': null,
      'humidity': null,
      'dewPoint': null,
      'uvIndex': null,
      'visibility': null,
      'pressure': null
    };
  }

  getWeatherForLatLon(lat, lon) {
    // const [lat, lon] = this.props.latlon;
    if (!lat || !lon) return console.error('Latitude or longitude is undefined!');
    // const weatherData = filterBasicCurrentWeatherData(getWeatherData(lat, lon).currently);
    return getBasicCurrentWeatherData(lat, lon)
      .then(res => {
        if (!res) throw new Error('Response was undefined.');
        const parsedRes = JSON.parse(res);
        if(typeof this.weather !== typeof parsedRes) throw new Error('Objects incompatible.');
        this.weather = parsedRes;
        console.log(this.weather);
        console.log(this.weather);
        this.emit('change');
      })
      .catch(err => console.error(`There has been a problem obtaining basic weather info: ${err.message}`));
  }

  getWeather() {
    return this.weather;
  }
}

const weatherStore = new WeatherStore();
// window.weatherStore = weatherStore; // Just for testing
export default weatherStore;

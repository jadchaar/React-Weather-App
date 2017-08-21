import {
  EventEmitter
} from 'events';

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

  getWeather() {
    return this.weather;
  }
}

const weatherStore = new WeatherStore;

export default weatherStore;

import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  getWeatherData,
  filterBasicCurrentWeatherData
} from '../utils/helpers';
import WeatherStore from '../stores/WeatherStore';
import {
  Row,
  Col
} from 'reactstrap';

class BasicInfoBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'windSpeed': null,
      'humidity': null,
      'dewPoint': null,
      'uvIndex': null,
      'visibility': null,
      'pressure': null
    };

    this.populateWeatherData = this.populateWeatherData.bind(this);
  }

  // TODO: Trigger this function elegantly on search submission success?
  populateWeatherData() {
    const [lat, lon] = this.props.latlon;
    if (!lat || !lon) return console.error('Latitude or longitude is undefined!');
    const weatherData = filterBasicCurrentWeatherData(getWeatherData(lat, lon).currently);
    console.log(weatherData);
    this.setState(weatherData);
  }

  render() {
    return (
      <div className="basic-info-bar">
        <Row>
          <Col>
            <p><strong>Wind:</strong> {this.state.windSpeed}</p>
          </Col>
          <Col>
            <p><strong>Humidity:</strong> {this.state.humidity}</p>
          </Col>
          <Col>
            <p><strong>Dew Pt:</strong> {this.state.dewPoint}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p><strong>UV Index:</strong> {this.state.uvIndex}</p>
          </Col>
          <Col>
            <p><strong>Visibility:</strong> {this.state.visibility}</p>
          </Col>
          <Col>
            <p><strong>Pressure:</strong> {this.state.pressure}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

BasicInfoBar.propTypes = {
  latlon: PropTypes.array.isRequired
};

export default BasicInfoBar;

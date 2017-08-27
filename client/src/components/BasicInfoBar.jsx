import React, {
  Component
} from 'react';
import WeatherStore from '../stores/WeatherStore';
import {
  Row,
  Col
} from 'reactstrap';

class BasicInfoBar extends Component {
  constructor(props) {
    super(props);

    this.state = WeatherStore.getWeather();

    this.getWeatherFromStore = this.getWeatherFromStore.bind(this);
  }

  componentWillMount() {
    WeatherStore.on('change', this.getWeatherFromStore);
  }

  componentWillUnmount() {
    WeatherStore.removeListener('change', this.getWeatherFromStore);
  }

  getWeatherFromStore() {
    this.setState(WeatherStore.getWeather());
  }

  render() {
    return (
      <div>
        <div className="section-spacer">
          {/* TODO: ADD UNITS */}
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
        <Row className="section-spacer">
          <Col>
            <h1 className="text-center">{Math.round(this.state.temperature)}°F - {this.state.summary}</h1>
            <h4 className="text-center font-weight-normal">{this.state.hourSummary}</h4>
          </Col>
        </Row>
        <Row className="section-spacer">
          <Col>
            <h6 className="text-center font-weight-normal">{this.state.dailySummary}</h6>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BasicInfoBar;

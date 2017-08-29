import React, {
  Component
} from 'react';
import WeatherStore from '../stores/WeatherStore';
import {
  Row,
  Col
} from 'reactstrap';
import {
  imperialUnits,
  determineIcon
} from '../utils/helpers';

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
    const {
      speed,
      percent,
      degrees,
      degreesF,
      // degreesC,
      // distance,
      plusDistance,
      pressure,
      // timePM,
      // timeAM,
    } = imperialUnits;

    // console.log(this.state.icon);

    let iconToDisplay;
    if(this.state.icon) {
      iconToDisplay = (
        <Row className="section-spacer flex-center">
          <img className="climacons" src={determineIcon(this.state.icon)} alt={this.state.icon} />
        </Row>
      );
    }

    return (
      <div>
        <div className="section-spacer">
          <Row>
            <Col className="flex-center">
              <p><strong>Wind:</strong> {this.state.windSpeed} {speed}</p>
            </Col>
            <Col className="flex-center">
              <p><strong>Humidity:</strong> {this.state.humidity}{percent}</p>
            </Col>
            <Col className="flex-center">
              <p><strong>Dew Pt:</strong> {this.state.dewPoint}{degrees}</p>
            </Col>
          </Row>
          <Row>
            <Col className="flex-center">
              <p><strong>UV Index:</strong> {this.state.uvIndex}</p>
            </Col>
            <Col className="flex-center">
              <p><strong>Visibility:</strong> {this.state.visibility}{plusDistance}</p>
            </Col>
            <Col className="flex-center">
              <p><strong>Pressure:</strong> {this.state.pressure} {pressure}</p>
            </Col>
          </Row>
        </div>
        {iconToDisplay}
        <Row className="section-spacer">
          <Col>
            <h1 className="text-center font-weight-bold">{this.state.temperature}{degreesF} - {this.state.currentSummary}</h1>
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

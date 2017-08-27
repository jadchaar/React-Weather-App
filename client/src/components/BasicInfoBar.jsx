import React, {
  Component
} from 'react';
// import PropTypes from 'prop-types';
import WeatherStore from '../stores/WeatherStore';
import {
  Row,
  Col
} from 'reactstrap';

class BasicInfoBar extends Component {
  constructor(props) {
    super(props);

    this.state = WeatherStore.getWeather();
  }

  componentWillMount() {
    WeatherStore.on('change', () => {
      this.setState(WeatherStore.getWeather());
    });
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
            {/* TEMP WITH UNITS / CURRENT CONDITON */}
            <h1 className="text-center">21°C - Clear.</h1>
            {/* TEMP FOR NEXT HOUR? */}
            <h4 className="text-center font-weight-normal">Clear for the hour.</h4>
          </Col>
        </Row>
        <Row className="section-spacer">
          <Col>
            {/* WEATHER SUMMARY FOR NEXT FEW DAYS */}
            <h6 className="text-center font-weight-normal">Light rain on Monday through next Friday, with temperatures bottoming out at 22°C on Tuesday.</h6>
          </Col>
        </Row>
      </div>
    );
  }
}

// BasicInfoBar.propTypes = {
//   latlon: PropTypes.array.isRequired
// };

export default BasicInfoBar;

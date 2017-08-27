import React, {
  Component
} from 'react';
import {
  InputGroup,
  InputGroupButton,
  Input,
  Button,
  Form,
  FormGroup
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {
  checkResponseStatus,
  generateQueryString
} from '../utils/helpers';
import * as WeatherActions from '../actions/WeatherActions';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getWeatherDispatch = this.getWeatherDispatch.bind(this);
  }

  searchLocation(query) {
    return fetch(`/api/react-weather/coordinates?${query}`, {
        mode: 'cors'
      })
      .then(checkResponseStatus)
      .catch(err => console.error(`There has been a problem with the fetch operation: ${err.message}`));
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  getWeatherDispatch(lat, lon) {
    WeatherActions.getWeatherForLocation(lat, lon)
      .then(this.props.onSubmissionSuccess())
      .catch(err => console.error(`There has been a problem with the dispatch operation: ${err.message}`));
  }

  handleSubmit(e) {
    e.preventDefault();
    const locationSearch = this.state.value;
    if (!locationSearch) {
      return; // TODO: CHANGE CLASS AND ALERT USER THAT FIELD IS BLANK
    }
    const qs = generateQueryString({
      location: locationSearch
    });
    this.searchLocation(qs)
      // .then(res => this.props.onLatLon(res.lat, res.lon))
      .then(res => this.getWeatherDispatch(res.lat, res.lon))
      .catch(err => console.error(`An error has occured. ${err.message}`));
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <InputGroup>
            <Input type="text" placeholder="Search for a location" value={this.state.value} onChange={this.handleChange} autoFocus />
            <InputGroupButton>
              <Button color="primary" type="submit" value="Submit">
                <FontAwesome name='search' />
              </Button>
            </InputGroupButton>
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
}

// Search.propTypes = {
//   onLatLon: PropTypes.func.isRequired
// };

Search.propTypes = {
  onSubmissionSuccess: PropTypes.func.isRequired
};

export default Search;

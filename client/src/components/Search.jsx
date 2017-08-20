import React, {
  Component
} from 'react';
import {
  InputGroup,
  InputGroupButton,
  Input,
  Button
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import querystring from 'querystring';
import PropTypes from 'prop-types';


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  inputToQueryString(input) {
    return querystring.stringify({
      location: input
    });
  }

  searchLocation(query) {
    return fetch(`/api/react-weather?${query}`, {
        method: 'GET',
        mode: 'cors',
        accept: 'application/json'
      })
      .then(checkResponseStatus)
      // .then(parseResponse)
      .catch(err => console.error(`There has been a problem with the fetch operation: ${err.message}`));
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const locationSearch = this.state.value;
    if (!locationSearch) {
      return; // TODO: CHANGE CLASS AND ALERT USER THAT FIELD IS BLANK
    }
    const qs = this.inputToQueryString(locationSearch);
    this.searchLocation(qs)
      .then(res => this.props.onLatLon(res.lat, res.lon))
      .catch(err => console.error(`An error has occured: ${err.message}`));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <InputGroup>
          <Input type="text" placeholder="Search for a location" value={this.state.value} onChange={this.handleChange} />
          <InputGroupButton>
            <Button color="primary" type="submit" value="Submit">
              <FontAwesome name='search' />
            </Button>
          </InputGroupButton>
        </InputGroup>
      </form>
    );
  }
}

Search.propTypes = {
  onLatLon: PropTypes.func.isRequired
};

const checkResponseStatus = res => {
  if (res.ok) return res.json();
  throw new Error(`Network response was not ok: ${res.statusText} (${res.status})`);
};

// const parseResponse = result => {
//   const latlon = result;
//   console.log(latlon.lat, latlon.lon);
//   // return res
// };

export default Search;

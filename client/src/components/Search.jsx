/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

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


class Search extends Component {
  constructor() {
    super();

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
      .then(res => {
        if (res.ok) { // status in the range 200-299
          return res; // push response to next
        }
        throw new Error(`Network response was not ok. Response status ${res.status}`);
      })
      // .then(res => JSON.parse(res))
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
    const output = this.searchLocation(qs);
    return output;
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

export default Search;

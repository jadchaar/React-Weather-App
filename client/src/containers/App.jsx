import React, {
  Component
} from 'react';
import Nav from 'components/Nav';
import Search from 'components/Search';
import Basic from 'components/BasicInfoBar';
import PreSearch from 'components/PreSearch';
import NoResults from 'components/NoResults';
import Footer from 'components/Footer';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

// Climate icons: http://adamwhitcroft.com/climacons/

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchSubmitted: false,
      noResults: false,
    };

    this.toggleSubmissionStatus = this.toggleSubmissionStatus.bind(this);
    this.toggleNoResults = this.toggleNoResults.bind(this);

    // this.state = {
    //   lat: '',
    //   lon: ''
    // };
    //
    // this.handleLatLon = this.handleLatLon.bind(this);
  }

  // Good article on sharing states between components https://goo.gl/CrudXt
  // handleLatLon(_lat, _lon) {
  //   this.setState({
  //     lat: _lat,
  //     lon: _lon
  //   });
  // }

  toggleSubmissionStatus() {
    this.setState({
      searchSubmitted: true
    });
  }

  toggleNoResults(inBool) {
    this.setState({
      noResults: inBool,
    });
  }

  render() {
    const noSubmissionMsg = (
      <div>
        <Container>
          <Row>
            <Col>
              <PreSearch />
            </Col>
          </Row>
        </Container>
      </div>
    );

    const noResultsMsg = (
      <div>
        <Container>
          <Row>
            <Col>
              <NoResults />
            </Col>
          </Row>
        </Container>
      </div>
    );

    let resultToDisplay;
    if (this.state.searchSubmitted && !this.state.noResults) {
      resultToDisplay = <Basic />;
    } else if (this.state.searchSubmitted && this.state.noResults) {
      resultToDisplay = noResultsMsg;
    } else {
      resultToDisplay = noSubmissionMsg;
    }

    return (
      <div>
        <Container>
          <Nav />
          {/*<Search onLatLon={this.handleLatLon} />*/}
          <Search onSubmissionSuccess={this.toggleSubmissionStatus} onNoResults={this.toggleNoResults} />
          {/*{this.state.searchSubmitted ? <Basic /> : noSubmissionMsg}*/}
          {resultToDisplay}
          <Footer />
        </Container>
      </div>
    );
  }
}

export default App;

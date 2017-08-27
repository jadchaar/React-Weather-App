import React, {
  Component
} from 'react';
import Nav from 'components/Nav';
import Search from 'components/Search';
import Basic from 'components/BasicInfoBar';
import PreSearch from 'components/PreSearch';
import Footer from 'components/Footer';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

// Climate icons: http://adamwhitcroft.com/climacons/

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchSubmitted: false
    };

    this.toggleSubmissionStatus = this.toggleSubmissionStatus.bind(this);

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

  render() {
    const noSubmissionMsg = (
      <div>
        <Container>
          <Row>
            <Col className="text-center">
              <PreSearch />
              <FontAwesome name='hand-o-up' />
            </Col>
          </Row>
        </Container>
      </div>
    );
    return (
      <div>
        <Container>
          <Nav />
          {/*<Search onLatLon={this.handleLatLon} />*/}
          <Search onSubmissionSuccess={this.toggleSubmissionStatus}/>
          {this.state.searchSubmitted ? <Basic /> : noSubmissionMsg}
          <Footer />
        </Container>
      </div>
    );
  }
}

export default App;

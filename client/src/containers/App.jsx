import React, {
  Component
} from 'react';
import Nav from 'components/Nav';
import Basic from 'components/BasicInfoBar';
import Search from 'components/Search';
import Footer from 'components/Footer';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

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

  render() {
    return (
      <div>
        <Container>
          <Nav />
          <Row>
            <Col>
              {/*<Search onLatLon={this.handleLatLon} />*/}
              <Search />
            </Col>
          </Row>
          <Basic />
          <Footer />
        </Container>
      </div>
    );
  }
}

export default App;

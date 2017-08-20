import React, {
  Component
} from 'react';
import 'containers/styles/App.css';
import Nav from 'components/Nav';
// import Card from 'components/CardRow';
import Search from 'components/Search';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: '',
      lon: ''
    };

    this.handleLatLon = this.handleLatLon.bind(this);
  }

  // Good article on sharing states between components https://goo.gl/CrudXt
  handleLatLon(_lat, _lon) {
    this.setState({
      lat: _lat,
      lon: _lon
    });
  }

  render() {
    return (
      <div>
        <Nav />
        {/*<Card />*/}
        <Search onLatLon={this.handleLatLon} />
      </div>
    );
  }
}

export default App;

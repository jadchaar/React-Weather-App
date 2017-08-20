import React, {
  Component
} from 'react';
import 'containers/styles/App.css';
import Nav from 'components/Nav';
// import Card from 'components/CardRow';
import Search from 'components/Search';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        {/*<Card />*/}
        <Search />
      </div>
    );
  }
}

export default App;

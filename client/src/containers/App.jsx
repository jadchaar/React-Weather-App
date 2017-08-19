import React, {
  Component
} from 'react';
import 'containers/styles/App.css';
import Nav from 'components/Nav';
import Card from 'components/CardRow';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Card />
      </div>
    );
  }
}

export default App;

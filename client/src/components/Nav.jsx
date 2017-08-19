import React, {
  Component
} from 'react';
import logo from 'images/logo.svg';
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';


class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarBrand href="/"><img src={ logo } className="nav-logo" alt=""/></NavbarBrand>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;

import React from 'react';
import logo from 'images/logo.svg';
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';

const NavBar = () => {
  return (
    <div>
        <Navbar color="faded" light className="flex-center">
          <NavbarBrand href="/"><img src={ logo } className="nav-logo" alt=""/></NavbarBrand>
        </Navbar>
      </div>
  );
};

export default NavBar;

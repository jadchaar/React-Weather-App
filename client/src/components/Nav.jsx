import React from 'react';
import logo from 'images/logo.svg';
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';

const NavBar = () => {
  const logoStyles  = {
    width: '250px'
  };

  return (
    <div>
        <Navbar color="faded" light className="flex-center">
          <NavbarBrand href="/"><img src={ logo } style={logoStyles} alt=""/></NavbarBrand>
        </Navbar>
      </div>
  );
};

export default NavBar;

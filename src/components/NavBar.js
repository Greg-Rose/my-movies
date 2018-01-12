import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import authApi from '../api/authApi';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  handleSignOut(){
    authApi.signOut();
    this.props.history.replace('/sign_in');
  }

  render() {
    return (
      <div>
        <Navbar color="faded" dark expand="md">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/discover" className="nav-link">Discover</Link>
            </NavItem>
            <NavItem>
              <Link to="/watched" className="nav-link">Watched</Link>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={this.handleSignOut.bind(this)}>Sign Out</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;

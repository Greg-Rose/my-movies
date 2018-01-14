import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem } from 'reactstrap';
import authApi from '../api/authApi';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
  handleSignOut(){
    authApi.signOut();
    this.props.history.replace('/sign_in');
  }

  render() {
    return (
      <Navbar color="faded" dark expand="xs">
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink to="/discover" className="nav-link">Discover</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/my_movies" className="nav-link">My Movies</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <a className="nav-link" id="sign-out-link" onClick={this.handleSignOut.bind(this)}>Sign Out</a>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;

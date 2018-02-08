import React, { Component } from 'react';
import { Collapse, NavbarToggler, Navbar, Nav, NavItem, Form, InputGroup, Button, Input } from 'reactstrap';
import authApi from '../../api/authApi';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSignOut(){
    authApi.signOut();
    this.props.history.replace('/sign_in');
  }

  handleSearch(event) {
    event.preventDefault();
    let query = document.getElementById('search').value;
    if (query.length && !!query.trim()) {
      this.props.history.replace('/search', { query: query });
    }
  }

  render() {
    return (
      <Navbar color="faded" dark expand="md">
        <Nav navbar id="no-collapse-nav">
          <NavItem>
            <NavLink to="/browse" className="nav-link">Browse</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/my_movies" className="nav-link">My Movies</NavLink>
          </NavItem>
        </Nav>
        <NavbarToggler onClick={this.toggle} className="ml-auto" />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr" navbar>
            <NavItem>
              <Form onSubmit={this.handleSearch} id="search-form">
                <InputGroup>
                  <Input type="search" name="search" id="search" placeholder="Search" />
                  <div className="input-group-append">
                    <Button><i className="fa fa-search" aria-hidden="true"></i></Button>
                  </div>
                </InputGroup>
              </Form>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <a className="nav-link" id="sign-out-link" onClick={this.handleSignOut.bind(this)}>Sign Out</a>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavBar;

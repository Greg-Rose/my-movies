import React, { Component } from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import Discover from './Discover';
import Newest from './Newest';
import Upcoming from './Upcoming';
import './Browse.css';

class Browse extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12" id="browse-nav-div">
            <Nav tabs horizontal="center">
              <NavItem>
                <NavLink to="/browse/discover" className="nav-link browse-nav">Discover</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/browse/newest" className="nav-link browse-nav">Newest</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/browse/upcoming" className="nav-link browse-nav">Upcoming</NavLink>
              </NavItem>
            </Nav>
          </div>
        </div>
        <Switch>
          <Route exact path="/browse/discover" component={Discover} />
          <Route exact path="/browse/newest" component={Newest} />
          <Route exact path="/browse/upcoming" component={Upcoming} />
          <Redirect to="/browse/discover" />
        </Switch>
      </div>
    );
  }
}

export default Browse;

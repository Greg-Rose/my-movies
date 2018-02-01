import React, { Component } from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import ToWatch from './ToWatch';
import Watched from './Watched';
import { Nav, NavItem } from 'reactstrap';
import './MyMovies.css';

class MyMovies extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12" id="my-movies-nav-div">
            <Nav tabs horizontal="center">
              <NavItem>
                <NavLink to="/my_movies/to_watch" className="nav-link my-movies-nav">To Watch</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/my_movies/watched" className="nav-link my-movies-nav">Watched</NavLink>
              </NavItem>
            </Nav>
          </div>
        </div>
        <Switch>
          <Route exact path="/my_movies/to_watch" component={ToWatch} />
          <Route exact path="/my_movies/watched" component={Watched} />
          <Redirect to="/my_movies/to_watch" />
        </Switch>
      </div>
    );
  }
}

export default MyMovies;

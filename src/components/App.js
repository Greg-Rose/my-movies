import React, { Component } from 'react';
import './App.css';
import SignInPage from './SignInPage';
import { Route, Switch } from 'react-router-dom';
import Discover from './Discover';
import withAuth from './withAuth';
import NoMatch from './NoMatch';
import WatchedMoviesList from './WatchedMoviesList';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/sign_in" component={SignInPage} />
          <Route exact path='/discover' component={Discover} />
          <Route exact path='/watched' component={WatchedMoviesList} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default withAuth(App);

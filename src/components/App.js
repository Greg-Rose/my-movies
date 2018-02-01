import React, { Component } from 'react';
import './App.css';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import { Route, Switch } from 'react-router-dom';
import Discover from './Discover';
import withAuth from './withAuth';
import NoMatch from './NoMatch';
import MyMovies from './MyMovies';
import Movie from './Movie';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/sign_in" component={SignInPage} />
          <Route exact path="/sign_up" component={SignUpPage} />
          <Route exact path='/discover' component={Discover} />
          <Route path='/movie' component={Movie} />
          <Route path='/my_movies' component={MyMovies} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default withAuth(App);

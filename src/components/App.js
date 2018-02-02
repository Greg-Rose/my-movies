import React, { Component } from 'react';
import './App.css';
import SignInPage from './auth/SignInPage';
import SignUpPage from './auth/SignUpPage';
import { Route, Switch } from 'react-router-dom';
import Discover from './browse/Discover';
import withAuth from './auth/withAuth';
import NoMatch from './auth/NoMatch';
import MyMovies from './user/MyMovies';
import Movie from './movie/Movie';

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

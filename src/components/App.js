import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './App.css';
import SignInPage from './auth/SignInPage';
import SignUpPage from './auth/SignUpPage';
import { Route, Switch } from 'react-router-dom';
import Browse from './browse/Browse';
import NoMatch from './auth/NoMatch';
import MyMovies from './user/MyMovies';
import Search from './browse/Search';
import Account from './user/Account';
import authApi from '../api/authApi';
import NavBar from './layout/NavBar';

class App extends Component {
  componentWillMount() {
    if (!authApi.userSignedIn() && this.props.history.location.pathname !== '/sign_up') {
      this.props.history.replace('/sign_in');
    }
    else {
      let token = authApi.getToken();
      if (authApi.isTokenExpired(token)) {
        authApi.signOut();
        this.props.history.replace('/sign_in' && this.props.history.location.pathname !== '/sign_up');
      }
    }
  }

  render() {
    let navbar;

    if (authApi.userSignedIn()) {
      navbar = <NavBar history={this.props.history} />
    }

    return (
      <div>
        {navbar}
        <Container>
          <Switch>
            <Route exact path="/sign_in" component={SignInPage} />
            <Route exact path="/sign_up" component={SignUpPage} />
            <Route path='/search' component={Search} />
            <Route path='/browse' component={Browse} />
            <Route path='/my_movies' component={MyMovies} />
            <Route exact path='/my_account' component={Account} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import authApi from '../api/authApi';
import NavBar from './NavBar';

export default function withAuth(AuthComponent) {
  return class AuthWrapped extends Component {
    componentWillMount() {
      if (!authApi.userSignedIn()) {
        this.props.history.replace('/sign_in');
      }
      else {
        let token = authApi.getToken();
        if (authApi.isTokenExpired(token)) {
          authApi.signOut();
          this.props.history.replace('/sign_in');
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
          <AuthComponent history={this.props.history} />
        </div>
      )
    }
  };
}

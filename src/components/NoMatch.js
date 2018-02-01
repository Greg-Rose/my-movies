import { Component } from 'react';
import authApi from '../api/authApi';

class NoMatch extends Component {
  componentWillMount() {
    if (authApi.userSignedIn()) {
      let token = authApi.getToken();
      if (authApi.isTokenExpired(token)) {
        authApi.signOut();
        this.props.history.replace('/sign_in');
      }
      else {
        this.props.history.replace('/my_movies');
      }
    }
    else {
      this.props.history.replace('/sign_in');
    }
  }

  render() {
    return null;
  }
}

export default NoMatch;

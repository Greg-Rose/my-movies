import decode from 'jwt-decode';
import ApiRequest from './apiRequest';

class AuthApi {
  static signIn(credentials) {
    return (
      ApiRequest.post('/sign_in', credentials, this.setToken, this.headers())
    );
  }

  static signUp(credentials) {
    return (
      ApiRequest.post('/sign_up', credentials, this.setToken, this.headers())
    );
  }

  static userSignedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  static isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    }
    catch(err) {
      return false;
    }
  }

  static setToken(response) {
    localStorage.setItem('authToken', response.auth_token);
  }

  static getToken() {
    return localStorage.getItem('authToken');
  }

  static signOut() {
    localStorage.removeItem('authToken');
  }

  static headers() {
    return (
      new Headers({
        'Content-Type': 'application/json'
      })
    );
  }
}

export default AuthApi;

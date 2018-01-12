import decode from 'jwt-decode';

class AuthApi {
  static signIn(credentials) {
    return (
      fetch('http://localhost:3000/sign_in', {
        method: 'post',
        headers: new Headers({
        'Content-Type': 'application/json'
        }),
        body: JSON.stringify(credentials)
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
                error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => response.json())
        .then(response => {
          this.setToken(response.auth_token);
          return Promise.resolve(response);
        })
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

  static setToken(token) {
    localStorage.setItem('authToken', token);
  }

  static getToken() {
    return localStorage.getItem('authToken');
  }

  static signOut() {
    localStorage.removeItem('authToken');
  }
}

export default AuthApi;

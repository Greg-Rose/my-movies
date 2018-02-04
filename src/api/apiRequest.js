import { API_ROOT } from './apiConfig';
import authApi from './authApi';

class ApiRequest {
  static request(endpoint, method, data, responseFunc) {
    let body = null;

    if (data !== null) {
      body = JSON.stringify(data);
    }

    return (
      fetch(API_ROOT + endpoint, {
        method: method,
        headers: new Headers({
          'Authorization': authApi.getToken(),
          'Content-Type': 'application/json'
        }),
        body: body
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
          responseFunc(response);
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`))
      );
  }

  static get(endpoint, responseFunc) {
    return (
      this.request(endpoint, 'get', null, responseFunc)
    );
  }

  static post(endpoint, data, responseFunc) {
    return (
      this.request(endpoint, 'post', data, responseFunc)
    );
  }

  static put(endpoint, data, responseFunc) {
    return (
      this.request(endpoint, 'put', data, responseFunc)
    );
  }
}

export default ApiRequest;

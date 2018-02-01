let backendHost;
const hostname = window && window.location && window.location.hostname;

if(hostname === 'mymovielist.surge.sh') {
  backendHost = 'https://mymovies-api.herokuapp.com';
} else {
  backendHost = 'http://localhost:3000';
}

export const API_ROOT = backendHost;

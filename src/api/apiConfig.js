const ApiRoot = () => {
  let backendHost;
  let hostname = window && window.location && window.location.hostname;

  if(hostname === 'mymovielist.surge.sh') {
    backendHost = 'https://mymovies-api.herokuapp.com';
  } else {
    backendHost = 'http://localhost:3000';
  }

  return backendHost;
};

export default ApiRoot;

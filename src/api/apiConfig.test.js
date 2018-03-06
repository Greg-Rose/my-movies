import ApiRoot from './apiConfig';

describe('ApiRoot', () => {
  it('return proper hostname when in production', () => {
    Object.defineProperty(global.location, 'hostname', {
      writable: true,
      value:'mymovielist.surge.sh'
    });

    expect(ApiRoot()).toEqual('https://mymovies-api.herokuapp.com');
  });

  it('return proper hostname when in dev', () => {
    Object.defineProperty(global.location, 'hostname', {
      writable: true,
      value:'localhost'
    });

    expect(ApiRoot()).toEqual('http://localhost:3000');
  });
});

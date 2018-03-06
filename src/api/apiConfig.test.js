import { API_ROOT } from './apiConfig';

describe('API_ROOT', () => {
  xit('return proper hostname when in production', () => {
    Object.defineProperty(global.location, 'hostname', {
      writable: true,
      value:'mymovielist.surge.sh'
    });

    expect(API_ROOT).toEqual('https://mymovies-api.herokuapp.com');
  });

  it('return proper hostname when in dev', () => {
    expect(API_ROOT).toEqual('http://localhost:3000');
  });
});

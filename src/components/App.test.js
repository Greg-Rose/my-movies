import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import authApi from '../api/authApi';
import NavBar from './layout/NavBar';
import { createMemoryHistory } from 'history';

describe('<App />', () => {
  let wrapper;
  let authApiSpy;

  beforeEach(() => {
    authApiSpy = jest.spyOn(authApi, 'signOut')
      .mockImplementation(() => {
        return null;
      });

    const authApiUserSignedInSpy = jest.spyOn(authApi, 'userSignedIn')
      .mockImplementation(() => {
        return true;
      });

    const authApiIsTokenExpiredSpy = jest.spyOn(authApi, 'isTokenExpired')
      .mockImplementation(() => {
        return false;
      });

    const authApiGetTokenSpy = jest.spyOn(authApi, 'getToken')
      .mockImplementation(() => {
        return "token";
      });

    const history = createMemoryHistory('/');

    wrapper = shallow(<App history={history} />);
  });

  it('should render a Container component', () => {
    expect(wrapper.find(Container).exists()).toEqual(true);
  });

  it('should render a Switch component', () => {
    expect(wrapper.find(Switch).exists()).toEqual(true);
  });

  it('should render 7 Route components', () => {
    expect(wrapper.find(Route).length).toEqual(7);
  });

  it('should render NavBar component if user is signed in', () => {
    expect(wrapper.find(NavBar).exists()).toEqual(true);
  });

  it('should not render NavBar component if user is not signed in', () => {
    const authApiUserSignedInSpy = jest.spyOn(authApi, 'userSignedIn')
      .mockImplementation(() => {
        return false;
      });

    const history = createMemoryHistory('/');

    wrapper = shallow(<App history={history} />);
    expect(wrapper.find(NavBar).exists()).toEqual(false);
  });

  it('should sign out if token is expired', () => {
    const authApiIsTokenExpiredSpy = jest.spyOn(authApi, 'isTokenExpired')
      .mockImplementation(() => {
        return true;
      });

    const history = createMemoryHistory('/');

    wrapper = shallow(<App history={history} />);

    expect(authApiSpy).toHaveBeenCalled();
  });
});

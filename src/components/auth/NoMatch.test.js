import React from 'react';
import { shallow } from 'enzyme';
import NoMatch from './NoMatch';
import authApi from '../../api/authApi';
import { createMemoryHistory } from 'history';

describe('<NoMatch />', () => {
  beforeEach(() => {
    const authApiUserSignedInSpy = jest.spyOn(authApi, 'userSignedIn')
      .mockImplementation(() => {
        return true;
      });

    const authApiGetTokenSpy = jest.spyOn(authApi, 'getToken')
      .mockImplementation(() => {
        return "token";
      });

    const authApiIsTokenExpiredSpy = jest.spyOn(authApi, 'isTokenExpired')
      .mockImplementation(() => {
        return false;
      });

    const authApiSignOutSpy = jest.spyOn(authApi, 'signOut')
      .mockImplementation(() => {
        return null;
      });
  });

  it('redirect to my movies if user is signed in', () => {
    const history = createMemoryHistory('/');
    const wrapper = shallow(<NoMatch history={history} />);

    expect(wrapper.instance().props.history.location.pathname).toEqual("/my_movies");
  });

  it('redirect to sign in if user is signed in and token is expired', () => {
    const authApiIsTokenExpiredSpy = jest.spyOn(authApi, 'isTokenExpired')
      .mockImplementation(() => {
        return true;
      });
    const history = createMemoryHistory('/');
    const wrapper = shallow(<NoMatch history={history} />);

    expect(wrapper.instance().props.history.location.pathname).toEqual("/sign_in");
  });

  it('redirect to sign in if user is not signed in', () => {
    const authApiUserSignedInSpy = jest.spyOn(authApi, 'userSignedIn')
      .mockImplementation(() => {
        return false;
      });
    const history = createMemoryHistory('/');
    const wrapper = shallow(<NoMatch history={history} />);

    expect(wrapper.instance().props.history.location.pathname).toEqual("/sign_in");
  });
});

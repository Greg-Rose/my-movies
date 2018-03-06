import React from 'react';
import { shallow } from 'enzyme';
import SignInPage from './SignInPage';
import { Row, Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import authApi from '../../api/authApi';
import { createMemoryHistory } from 'history';

describe('<SignInPage />', () => {
  let wrapper;
  let authApiSignInSpy;

  beforeEach(() => {
    const authApiUserSignedInSpy = jest.spyOn(authApi, 'userSignedIn')
      .mockImplementation(() => {
        return false;
      });

    authApiSignInSpy = jest.spyOn(authApi, 'signIn')
      .mockImplementation((credentials) => {
        return new Promise(function(resolve, reject) {
          resolve();
        });
      });

    wrapper = shallow(<SignInPage />);
  });

  it('should render a Row component', () => {
    expect(wrapper.find(Row).exists()).toEqual(true);
  });

  it("should render a Col component", () => {
    expect(wrapper.find(Col).exists()).toEqual(true);
  });

  it("should render a Form component with 2 Inputs and a Button", () => {
    expect(wrapper.find(Form).exists()).toEqual(true);
    expect(wrapper.find(Input).length).toEqual(2);
    expect(wrapper.find(Button).exists()).toEqual(true);
  });

  it('onChange function updates state', () => {
    wrapper.instance().onChange({ target: {name: "email", value: "test@test.com" } });
    expect(wrapper.instance().state.email).toEqual("test@test.com");
  });

  it('onSubmit function sets alert if email or password are blank', () => {
    wrapper.setState({ emaiL: 'test@test.com'});
    wrapper.instance().onSubmit(new Event(null));
    expect(wrapper.instance().state.alert).toEqual("Email and password can't be blank");
  });

  it('onSubmit function calls authApi.signIn', () => {
    wrapper.setState({ email: 'test@test.com', password: "wrong"});
    wrapper.instance().onSubmit(new Event(null));
    expect(wrapper.instance().state.email).toEqual("test@test.com");
    expect(wrapper.instance().state.password).toEqual("wrong");
    expect(authApiSignInSpy).toHaveBeenCalled();
  });

  it('redirect function changes history if user is signed in', () => {
    const history = createMemoryHistory('/sign_in');
    const wrapper = shallow(<SignInPage history={history} />);
    const authApiUserSignedInSpy = jest.spyOn(authApi, 'userSignedIn')
      .mockImplementation(() => {
        return true;
      });
    wrapper.instance().redirect();
    expect(wrapper.instance().props.history.location.pathname).toEqual("/");
  });
});

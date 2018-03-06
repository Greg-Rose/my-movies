import React from 'react';
import { shallow } from 'enzyme';
import SignUpPage from './SignUpPage';
import { Row, Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import authApi from '../../api/authApi';
import { createMemoryHistory } from 'history';

describe('<SignUpPage />', () => {
  let wrapper;
  let authApiSignUpSpy;

  beforeEach(() => {
    const authApiUserSignedInSpy = jest.spyOn(authApi, 'userSignedIn')
      .mockImplementation(() => {
        return false;
      });

    authApiSignUpSpy = jest.spyOn(authApi, 'signUp')
      .mockImplementation((credentials) => {
        return new Promise(function(resolve, reject) {
          resolve();
        });
      });

    wrapper = shallow(<SignUpPage />);
  });

  it('should render a Row component', () => {
    expect(wrapper.find(Row).exists()).toEqual(true);
  });

  it("should render a Col component", () => {
    expect(wrapper.find(Col).exists()).toEqual(true);
  });

  it("should render a Form component with 2 Inputs and a Button", () => {
    expect(wrapper.find(Form).exists()).toEqual(true);
    expect(wrapper.find(Input).length).toEqual(5);
    expect(wrapper.find(Button).exists()).toEqual(true);
  });

  it('onChange function updates state', () => {
    wrapper.instance().onChange({ target: {name: "email", value: "test@test.com" } });
    expect(wrapper.instance().state.email).toEqual("test@test.com");
  });

  it('onSubmit function sets alert any fields are blank', () => {
    wrapper.setState({ emaiL: 'test@test.com'});
    wrapper.instance().onSubmit(new Event(null));
    expect(wrapper.instance().state.alert).toEqual("Please fill out all fields");
  });

  it('onSubmit function calls authApi.signUp', () => {
    wrapper.setState({ first_name: "John", last_name: "Smith", email: 'test@test.com', password: "password", password_confirmation: "password"});
    wrapper.instance().onSubmit(new Event(null));
    expect(authApiSignUpSpy).toHaveBeenCalled();
  });

  it('redirect function changes history if user is signed in', () => {
    const history = createMemoryHistory('/sign_up');
    const wrapper = shallow(<SignUpPage history={history} />);
    const authApiUserSignedInSpy = jest.spyOn(authApi, 'userSignedIn')
      .mockImplementation(() => {
        return true;
      });
    wrapper.instance().redirect();
    expect(wrapper.instance().props.history.location.pathname).toEqual("/");
  });
});

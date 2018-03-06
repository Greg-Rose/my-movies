import React from 'react';
import { shallow } from 'enzyme';
import Account from './Account';
import { Row, Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import ApiRequest from '../../api/apiRequest';

describe('<Account />', () => {
  beforeEach(() => {
    const ApiRequestGetSpy = jest.spyOn(ApiRequest, 'get')
      .mockImplementation((path, responseFunc) => {
        // Data is the parameter our method would normally recieve
        let response = {
          first_name: "John",
          last_name: "Smith",
          email: "jsmith@test.com"
        };
        return responseFunc(response);
      });
    const ApiRequestPutSpy = jest.spyOn(ApiRequest, 'put')
      .mockImplementation((path, data, responseFunc) => {
        // Data is the parameter our method would normally recieve
        if (data.password.length > 1 && data.password_confirmation === '') {
          let response = {
            message: ["Password doesn't match password confirmation", "Email can't be blank"]
          };

          return responseFunc(response);
        }
        else {
          let response = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
          };

          return responseFunc(response);
        }
      });
  });

  it('should render a Row component', () => {
    let wrapper = shallow(<Account />);
    expect(wrapper.find(Row).exists()).toEqual(true);
  });

  it('should render a Col component', () => {
    let wrapper = shallow(<Account />);
    expect(wrapper.find(Col).exists()).toEqual(true);
  });

  it('should render a Form component', () => {
    let wrapper = shallow(<Account />);
    expect(wrapper.find(Form).exists()).toEqual(true);
  });

  it('should render 6 FormGroup components', () => {
    let wrapper = shallow(<Account />);
    expect(wrapper.find(FormGroup).length).toEqual(6);
  });

  it('onChange function updates state', () => {
    const wrapper = shallow(<Account />);
    wrapper.instance().onChange({ target: {name: "email", value: "test@test.com" } });
    expect(wrapper.instance().state.email).toEqual("test@test.com");
  });

  it('onSubmit function sets alert if no current password is given', () => {
    const wrapper = shallow(<Account />);
    wrapper.instance().onSubmit(new Event(null));
    expect(wrapper.instance().state.alert.active).toEqual(true);
    expect(wrapper.instance().state.alert.message).toEqual("You must include your current password");
  });

  it('onSubmit function sets alert if api returns message(s)', () => {
    const wrapper = shallow(<Account />);
    wrapper.setState({ emaiL: '', password: 'test', current_password: "password" });
    wrapper.instance().onSubmit(new Event(null));

    expect(wrapper.instance().state.alert.active).toEqual(true);
    expect(wrapper.instance().state.alert.message[0]).toEqual("Password doesn't match password confirmation");
    expect(wrapper.instance().state.alert.message[2]).toEqual("Email can't be blank");
  });

  it('onSubmit function sets success alert if api request is successful with no message', () => {
    const wrapper = shallow(<Account />);
    wrapper.setState({ email: 'test@test.com', current_password: "password" });
    wrapper.instance().onSubmit(new Event(null));
    expect(wrapper.instance().state.alert.active).toEqual(true);
    expect(wrapper.instance().state.alert.message).toEqual("Account updated!");
    expect(wrapper.instance().state.email).toEqual("test@test.com");
  });
});

import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import withAuth from './auth/withAuth';
jest.mock('./auth/withAuth');

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
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
});

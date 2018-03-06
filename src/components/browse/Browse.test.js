import React from 'react';
import {shallow} from 'enzyme';
import Browse from './Browse';
import { Row, Col, Nav, NavItem } from 'reactstrap';
import { Route, Switch, Redirect } from 'react-router-dom';

describe('<Browse />', () => {
  it('should render a Row component', () => {
    let wrapper = shallow(<Browse />);
    expect(wrapper.find(Row).exists()).toEqual(true);
  });

  it('should render a Col component', () => {
    let wrapper = shallow(<Browse />);
    expect(wrapper.find(Col).exists()).toEqual(true);
  });

  it('should render 3 NavItem components', () => {
    let wrapper = shallow(<Browse />);
    expect(wrapper.find(NavItem).length).toEqual(3);
  });

  it('should render a Switch component', () => {
    let wrapper = shallow(<Browse />);
    expect(wrapper.find(Switch).exists()).toEqual(true);
  });

  it('should render 3 Route components', () => {
    let wrapper = shallow(<Browse />);
    expect(wrapper.find(Route).length).toEqual(3);
  });

  it('should render a Redirect component', () => {
    let wrapper = shallow(<Browse />);
    expect(wrapper.find(Redirect).exists()).toEqual(true);
  });
});

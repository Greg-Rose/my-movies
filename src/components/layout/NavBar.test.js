import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './NavBar';
import { Collapse, Nav, NavItem } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import authApi from '../../api/authApi';
import { createMemoryHistory } from 'history';

describe('<NavBar />', () => {
  beforeEach(() => {
    const authApiSpy = jest.spyOn(authApi, 'signOut')
      .mockImplementation(() => {
        return null;
      });
  });

  it("should render 3 reactstrap Nav component", () => {
    let wrapper = shallow(<NavBar />);
    expect(wrapper.find(Nav).length).toEqual(3);
  });

  it('should render a reactstrap Collapse component', () => {
    let wrapper = shallow(<NavBar />);
    expect(wrapper.find(Collapse).exists()).toEqual(true);
  });

  it('should render 5 reactstrap NavItem', () => {
    let wrapper = shallow(<NavBar />);
    expect(wrapper.find(NavItem).length).toEqual(5);
  });

  it('should render 3 NavLink components', () => {
    let wrapper = shallow(<NavBar />);
    expect(wrapper.find(NavLink).length).toEqual(3);
  });

  it('toggle() should toggle state.isOpen boolean', () => {
    const wrapper = shallow(<NavBar />);
    wrapper.instance().toggle();
    expect(wrapper.instance().state.isOpen).toEqual(true);
  });

  it('handleSignOut changes history location', () => {
    const history = createMemoryHistory('/');
    const wrapper = shallow(<NavBar history={history} />);
    wrapper.instance().handleSignOut();
    expect(wrapper.instance().props.history.location.pathname).toEqual("/sign_in");
  });

  it('handleSearch does nothing if search field empty/blank', () => {
    const inputValueSpy = jest.spyOn(document, 'getElementById')
      .mockImplementation(() => {
        return { value: "   " };
      });

    const history = createMemoryHistory('/');
    const wrapper = shallow(<NavBar history={history} />);
    wrapper.instance().handleSearch(new Event(null));
    expect(wrapper.instance().props.history.location.pathname).toEqual("/");
    expect(wrapper.instance().props.history.location.state).toEqual(undefined);
  });

  it('handleSearch changes history location with query', () => {
    const inputValueSpy = jest.spyOn(document, 'getElementById')
      .mockImplementation(() => {
        return { value: "Thor" };
      });

    const history = createMemoryHistory('/');
    const wrapper = shallow(<NavBar history={history} />);
    wrapper.instance().handleSearch(new Event(null));
    expect(wrapper.instance().props.history.location.pathname).toEqual("/search");
    expect(wrapper.instance().props.history.location.state.query).toEqual("Thor");
  });
});

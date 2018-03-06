import React from 'react';
import {shallow} from 'enzyme';
import MyMovies from './MyMovies';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import { Row, Col, Nav, NavItem } from 'reactstrap';

// describe('<ToWatch />', () => {
//   it('should render GetMyMovies component', () => {
//     let wrapper = shallow(<ToWatch />);
//     expect(wrapper.find(GetMyMovies).exists()).toEqual(true);
//   });
// });

describe('<MyMovies />', () => {
  it('should render a Row component', () => {
    let wrapper = shallow(<MyMovies />);
    expect(wrapper.find(Row).exists()).toEqual(true);
  });

  it('should render a Col component', () => {
    let wrapper = shallow(<MyMovies />);
    expect(wrapper.find(Col).exists()).toEqual(true);
  });

  it('should render a Nav component', () => {
    let wrapper = shallow(<MyMovies />);
    expect(wrapper.find(Nav).exists()).toEqual(true);
  });

  it('should render 2 NavItem components', () => {
    let wrapper = shallow(<MyMovies />);
    expect(wrapper.find(NavItem).length).toEqual(2);
  });

  it('should render 2 NavItem components', () => {
    let wrapper = shallow(<MyMovies />);
    expect(wrapper.find(NavItem).length).toEqual(2);
  });

  it('should render 2 NavLink components', () => {
    let wrapper = shallow(<MyMovies />);
    expect(wrapper.find(NavLink).length).toEqual(2);
  });
});

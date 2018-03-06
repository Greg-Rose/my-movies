import React from 'react';
import {shallow} from 'enzyme';
import Spinner from './Spinner';
import { Row, Col } from 'reactstrap';

describe('<Spinner />', () => {
  it('should render a Row component', () => {
    let wrapper = shallow(<Spinner />);
    expect(wrapper.find(Row).exists()).toEqual(true);
  });

  it('should render a Col component', () => {
    let wrapper = shallow(<Spinner />);
    expect(wrapper.find(Col).exists()).toEqual(true);
  });

  it('should render a spinner icon', () => {
    let wrapper = shallow(<Spinner />);
    expect(wrapper.find('i').hasClass('fa-spinner')).toEqual(true);
  });
});

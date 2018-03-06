import React from 'react';
import {shallow} from 'enzyme';
import ToWatch from './ToWatch';
import GetMyMovies from './GetMyMovies';

describe('<ToWatch />', () => {
  it('should render GetMyMovies component', () => {
    let wrapper = shallow(<ToWatch />);
    expect(wrapper.find(GetMyMovies).exists()).toEqual(true);
  });
});

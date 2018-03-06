import React from 'react';
import {shallow} from 'enzyme';
import Watched from './Watched';
import GetMyMovies from './GetMyMovies';

describe('<Watched />', () => {
  it('should render GetMyMovies component', () => {
    let wrapper = shallow(<Watched />);
    expect(wrapper.find(GetMyMovies).exists()).toEqual(true);
  });
});

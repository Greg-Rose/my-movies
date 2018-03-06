import React from 'react';
import {shallow} from 'enzyme';
import MovieInfoBox from './MovieInfoBox';
import { Badge } from 'reactstrap';

describe('<MovieInfoBox />', () => {
  it('should render a Row component', () => {
    let wrapper = shallow(<MovieInfoBox title="testing" body="1 2 3" />);
    expect(wrapper.find(Badge).exists()).toEqual(true);
  });

  it('should renders 2 h6 elements', () => {
    let wrapper = shallow(<MovieInfoBox title="testing" body="1 2 3" />);
    expect(wrapper.find("h6").length).toEqual(2);
    expect(wrapper.find(".movie-info-box-title").text()).toEqual("testing");
    expect(wrapper.find(".movie-info-box-body").text()).toEqual("1 2 3");
  });
});

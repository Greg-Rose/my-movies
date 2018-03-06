import React from 'react';
import { shallow } from 'enzyme';
import GetMyMovies from './GetMyMovies';
import { Row, Col } from 'reactstrap';
import MovieThumb from '../movie/MovieThumb';
import ApiRequest from '../../api/apiRequest';

describe('<GetMyMovies />', () => {
  beforeEach(() => {
    const ApiRequestGetSpy = jest.spyOn(ApiRequest, 'get')
      .mockImplementation((path, responseFunc) => {
        // Data is the parameter our method would normally recieve
        let response = [
          {
            id: 1,
            tmdb_id: 1
          }
        ];

        return responseFunc(response);
      });
  });

  it('should render a Row component', () => {
    let wrapper = shallow(<GetMyMovies path="watched" />);
    expect(wrapper.find(Row).exists()).toEqual(true);
  });

  it('should render a MovieThumb component', () => {
    let wrapper = shallow(<GetMyMovies path="watched" />);
    expect(wrapper.find(MovieThumb).exists()).toEqual(true);
  });

  it('should render a message if not movies returned', () => {
    const ApiRequestGetSpy = jest.spyOn(ApiRequest, 'get')
      .mockImplementation((path, responseFunc) => {
        // Data is the parameter our method would normally recieve
        return responseFunc([]);
      });

    let wrapper = shallow(<GetMyMovies path="watched" name={"\"Watched\""} />);

    expect(wrapper.find(Col).exists()).toEqual(true);
    expect(wrapper.find("p.my-movies-message").text()).toEqual("Mark movies as \"\"Watched\"\" and they'll show up here.");
    expect(wrapper.find(MovieThumb).exists()).toEqual(false);
  });
});

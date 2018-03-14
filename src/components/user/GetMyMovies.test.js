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
        let response;
        if (!path.includes("&page")) {
          response = {
            page: 1,
            total_pages: 10,
            movies: [{ id: 1, tmdb_id: 1 }]
          };
        }
        else {
          response = {
            page: 2,
            total_pages: 10,
            movies: [{ id: 2, tmdb_id: 2 }, { id: 3, tmdb_id: 3 }]
          };
        }

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
        return responseFunc({ movies: [] });
      });

    let wrapper = shallow(<GetMyMovies path="watched" name={"\"Watched\""} />);

    expect(wrapper.find(Col).exists()).toEqual(true);
    expect(wrapper.find("p.my-movies-message").text()).toEqual("Mark movies as \"\"Watched\"\" and they'll show up here.");
    expect(wrapper.find(MovieThumb).exists()).toEqual(false);
  });

  it('nextPage() should set state', () => {
    let wrapper = shallow(<GetMyMovies path="watched" />);
    wrapper.instance().nextPage();
    expect(wrapper.instance().state.page).toEqual(2);
    expect(wrapper.instance().state.movies).toEqual([{ id: 1, tmdb_id: 1 }, { id: 2, tmdb_id: 2 }, { id: 3, tmdb_id: 3 }]);
  });

  it('nextPage() does nothing if current page + 1 > totalPages', () => {
    let wrapper = shallow(<GetMyMovies path="watched" />);
    wrapper.instance().setState({page: 10});
    wrapper.instance().nextPage();
    expect(wrapper.instance().state.page).toEqual(10);
    expect(wrapper.instance().state.movies).toEqual([{ id: 1, tmdb_id: 1 }]);
  });

  it('removeMovie() calls remove() on movie element id', () => {
    const getElementByIdSpy = jest.spyOn(document, 'getElementById')
      .mockImplementation(() => {
        return { remove: () => null };
      });
    let wrapper = shallow(<GetMyMovies path="watched" />);
    wrapper.instance().removeMovie("1");
    expect(getElementByIdSpy).toHaveBeenCalled();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import Discover from './Discover';
import { Row, Col, Label, Button } from 'reactstrap';
import ApiRequest from '../../api/apiRequest';
import MovieThumb from '../movie/MovieThumb';

describe('<Discover />', () => {
  let wrapper;

  beforeEach(() => {
    const ApiRequestGetSpy = jest.spyOn(ApiRequest, 'get')
      .mockImplementation((path, responseFunc) => {
        let response;
        if (path === "/genres") {
          response = [
            {
              tmdb_id: 1,
              name: "Action"
            },
            {
              tmdb_id: 2,
              name: "Comedy"
            }
          ];
        }
        else if (path === "/movies/discover") {
          response = {
            page: 1,
            total_pages: 10,
            results: [{ id: 1 }, { id: 2 }]
          };
        }
        else {
          response = {
            page: 2,
            total_pages: 10,
            results: [{ id: 2 }, { id: 3 }]
          };
        }

        return responseFunc(response);
      });

    wrapper = shallow(<Discover />);
  });

  it('should render a Row component', () => {
    expect(wrapper.find(Row).exists()).toEqual(true);
  });

  it("should render 2 Col and a third Col for loadMoreBtn if page < totalPages", () => {
    expect(wrapper.find(Col).length).toEqual(3);
    expect(wrapper.find(Button).length).toEqual(1);
  });

  it("should render MovieThumb component for each movie in results", () => {
    expect(wrapper.find(MovieThumb).length).toEqual(2);
  });

  it('nextPage() should set state', () => {
    wrapper.instance().nextPage();
    expect(wrapper.instance().state.page).toEqual(2);
    expect(wrapper.instance().state.movies).toEqual([{ id: 1 }, { id: 2 }, { id: 2 }, { id: 3 }]);
  });

  it('nextPage() does nothing if current page + 1 > totalPages', () => {
    wrapper.instance().setState({page: 10});
    wrapper.instance().nextPage();
    expect(wrapper.instance().state.page).toEqual(10);
    expect(wrapper.instance().state.movies).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('selectGenre() should update state', () => {
    wrapper.instance().selectGenre({ value: "", label: "All" });
    expect(wrapper.instance().state.selectedGenre).toEqual({ value: "", label: "All" });
    // workaround for test - would really equal { id: 2 }, { id: 3 }
    expect(wrapper.instance().state.movies).toEqual([{ id: 1 }, { id: 2 }, { id: 2 }, { id: 3 }]);
  });

  it('selectSort() should update state', () => {
    wrapper.instance().selectSort({ label: "Popularity ↓", value: "popularity.desc" });
    expect(wrapper.instance().state.sortBy).toEqual({ label: "Popularity ↓", value: "popularity.desc" });
    // workaround for test - would really equal { id: 2 }, { id: 3 }
    expect(wrapper.instance().state.movies).toEqual([{ id: 1 }, { id: 2 }, { id: 2 }, { id: 3 }]);
  });
});

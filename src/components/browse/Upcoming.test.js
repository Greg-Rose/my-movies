import React from 'react';
import { shallow } from 'enzyme';
import Upcoming from './Upcoming';
import { Row, Col, Button } from 'reactstrap';
import ApiRequest from '../../api/apiRequest';
import MovieThumb from '../movie/MovieThumb';

describe('<Upcoming />', () => {
  let wrapper;

  beforeEach(() => {
    const ApiRequestGetSpy = jest.spyOn(ApiRequest, 'get')
      .mockImplementation((path, responseFunc) => {
        let response;
        if (path === "/movies/upcoming") {
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

    wrapper = shallow(<Upcoming />);
  });

  it('should render a Row component', () => {
    expect(wrapper.find(Row).exists()).toEqual(true);
  });

  it("should render load more Button in Col if page < totalPages", () => {
    expect(wrapper.find(Col).length).toEqual(1);
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
});

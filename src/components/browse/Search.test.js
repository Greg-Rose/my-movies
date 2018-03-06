import React from 'react';
import { shallow, mount } from 'enzyme';
import Search from './Search';
import { Row, Col, Button } from 'reactstrap';
import ApiRequest from '../../api/apiRequest';
import MovieThumb from '../movie/MovieThumb';
import { createMemoryHistory } from 'history';
import Spinner from '../layout/Spinner';

describe('<Search />', () => {
  let wrapper;

  beforeEach(() => {
    const ApiRequestGetSpy = jest.spyOn(ApiRequest, 'get')
      .mockImplementation((path, responseFunc) => {
        let response;
        if (path.includes("second search")) {
          response = {
            page: 1,
            total_pages: 100,
            results: [{ id: 5 }, { id: 6 }]
          };
        }
        else if (!path.includes("&page")) {
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

    let location = {state: { query: "test" } };
    wrapper = shallow(<Search location={location} />);
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

  it('new props updates state with new results', () => {
    let location = {state: { query: "second search" } };
    wrapper.setProps({location: location});
    expect(wrapper.instance().state.totalPages).toEqual(100);
    expect(wrapper.instance().state.movies).toEqual([{ id: 5 }, { id: 6 }]);
  });

  it('new props does nothing if state is undefined', () => {
    let location = {state: undefined };
    wrapper.setProps({location: location});
    expect(wrapper.instance().state.totalPages).toEqual(10);
    expect(wrapper.instance().state.movies).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('returns message if no movies returned', () => {
    wrapper.instance().setState({movies: []});
    wrapper.update();
    expect(wrapper.find(Row).exists()).toEqual(true);
    expect(wrapper.find(Col).exists()).toEqual(true);
    expect(wrapper.find("h6").text()).toEqual("No movies were found that match your search.");
  });

  it('changes history location if no query in location state', () => {
    const history = createMemoryHistory('/search');
    let location = {state: undefined};
    wrapper = mount(<Search history={history} location={location} />);
    expect(wrapper.instance().props.history.location.pathname).toEqual("/");
  });

  it('shows Spinner while state is null', () => {
    const history = createMemoryHistory('/search');
    let location = {state: undefined};
    wrapper = mount(<Search history={history} location={location} />);
    expect(wrapper.find(Spinner).exists()).toEqual(true);
  });

  it('clears search bar on unmount', () => {
    const input = document.createElement('input');
    input.setAttribute("id", "search");
    input.setAttribute("value", "test");
    const div = document.createElement('div');
    window.domNode = div;
    document.body.appendChild(input);
    document.body.appendChild(div);
    let location = {state: { query: "test" } };
    document
    wrapper = mount(<Search location={location} />, { attachTo: window.domNode });
    expect(document.getElementById("search").value).toEqual("test");
    wrapper.unmount();
    expect(document.getElementById("search").value).toEqual("");
  });
});

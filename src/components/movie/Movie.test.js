import React from 'react';
import { shallow, mount } from 'enzyme';
import Movie from './Movie';
import { Row, Col, Button } from 'reactstrap';
import ApiRequest from '../../api/apiRequest';
import Cast from './Cast';
import Trailers from './Trailers';
import MovieInfoBox from './MovieInfoBox';
import { createMemoryHistory } from 'history';
import Spinner from '../layout/Spinner';

describe('<Movie />', () => {
  let wrapper;

  beforeEach(() => {
    const ApiRequestGetSpy = jest.spyOn(ApiRequest, 'get')
      .mockImplementation((path, responseFunc) => {
        let response = {
          watched: true,
          to_watch: false,
          my_movie_id: 1,
          title: "movie title",
          release_date: "2017/12/3",
          runtime: 120,
          id: 1234,
          poster_path: "path",
          release_dates: { results: [1, 2] },
          genres: [{name: "Action"}, {name: "Comedy"}],
          overview: "summary",
          credits: { cast: [] },
          videos: { results: [] }
        };

        return responseFunc(response);
      });

    const ApiRequestPostSpy = jest.spyOn(ApiRequest, 'post')
      .mockImplementation((path, data, responseFunc) => {
        let response = {
          watched: data.watched,
          to_watch: data.to_watch,
          id: 2
        };

        return responseFunc(response);
      });

    const ApiRequestPutSpy = jest.spyOn(ApiRequest, 'put')
      .mockImplementation((path, data, responseFunc) => {
        let response = {
          watched: data.watched,
          to_watch: data.to_watch,
          id: 1
        };

        return responseFunc(response);
      });

    const ApiRequestDeleteSpy = jest.spyOn(ApiRequest, 'delete')
      .mockImplementation((path, responseFunc) => {
        let response = {
          watched: false,
          to_watch: false,
          id: null
        };

        return responseFunc(response);
      });

    wrapper = shallow(<Movie id="1234" />);
  });

  it('should render a Row component', () => {
    expect(wrapper.find(Row).exists()).toEqual(true);
  });

  it("should render 2 reactstrap Button components", () => {
    expect(wrapper.find(Button).length).toEqual(2);
  });

  it("should render 8 reactstrap Col component", () => {
    expect(wrapper.find(Col).length).toEqual(8);
  });

  it("should render 4 MovieInfoBox components", () => {
    expect(wrapper.find(MovieInfoBox).length).toEqual(4);
  });

  it("should render 1 Cast component", () => {
    expect(wrapper.find(Cast).length).toEqual(1);
  });

  it("should render 1 Trailers component", () => {
    expect(wrapper.find(Trailers).length).toEqual(1);
  });

  it("should render genres as N/A if no genres are returned", () => {
    const ApiRequestGetSpy = jest.spyOn(ApiRequest, 'get')
      .mockImplementation((path, responseFunc) => {
        let response = {
          watched: true,
          to_watch: false,
          my_movie_id: 1,
          title: "movie title",
          release_date: "2017/12/3",
          runtime: 120,
          id: 1234,
          poster_path: "path",
          release_dates: { results: [1, 2] },
          genres: [],
          overview: "summary",
          credits: { cast: [] },
          videos: { results: [] }
        };

        return responseFunc(response);
      });

    wrapper = shallow(<Movie id="1234" />);
    expect(wrapper.find(MovieInfoBox).first().props().body).toEqual("N/A");
  });

  it('setMyMovieStatus() should set state', () => {
    let data = {
      watched: false,
      to_watch: true,
      id: 3
    };

    wrapper.instance().setMyMovieStatus(data);
    expect(wrapper.instance().state.watched).toEqual(false);
    expect(wrapper.instance().state.to_watch).toEqual(true);
    expect(wrapper.instance().state.my_movie_id).toEqual(3);
  });

  it('handleClick updates state after post request', () => {
    wrapper.instance().setState({ watched: false, to_watch: false });
    wrapper.instance().handleClick(true, true);

    expect(wrapper.instance().state.watched).toEqual(true);
    expect(wrapper.instance().state.to_watch).toEqual(true);
    expect(wrapper.instance().state.my_movie_id).toEqual(2);
  });

  it('handleClick updates state after put request', () => {
    wrapper.instance().handleClick(true, true);

    expect(wrapper.instance().state.watched).toEqual(true);
    expect(wrapper.instance().state.to_watch).toEqual(true);
    expect(wrapper.instance().state.my_movie_id).toEqual(1);
  });

  it('handleClick updates state after delete request', () => {
    wrapper.instance().handleClick(false, false);

    expect(wrapper.instance().state.watched).toEqual(false);
    expect(wrapper.instance().state.to_watch).toEqual(false);
    expect(wrapper.instance().state.my_movie_id).toEqual(null);
  });

  it('markAsToWatch toggles state.to_watch via handleClick', () => {
    wrapper.instance().markAsToWatch();

    expect(wrapper.instance().state.watched).toEqual(true);
    expect(wrapper.instance().state.to_watch).toEqual(true);
  });

  it('markAsWatched toggles state.watched via handleClick', () => {
    wrapper.instance().markAsWatched();

    expect(wrapper.instance().state.watched).toEqual(false);
    expect(wrapper.instance().state.to_watch).toEqual(false);
  });

  it('runtime set to N/A if given 0', () => {
    let movie = {
      watched: true,
      to_watch: false,
      my_movie_id: 1,
      title: "movie title",
      release_date: "2017/12/3",
      runtime: 0,
      id: 1234,
      poster_path: "path",
      release_dates: { results: [1, 2] },
      genres: [{name: "Action"}, {name: "Comedy"}],
      overview: "summary",
      credits: { cast: [] },
      videos: { results: [] }
    };
    wrapper.instance().setState({ movie: movie});
    wrapper.update();

    expect(wrapper.find(MovieInfoBox).last().html().includes("N/A")).toEqual(true);
  });

  it('shows Spinner while state is null', () => {
    const ApiRequestGetSpy = jest.spyOn(ApiRequest, 'get')
      .mockImplementation((path, responseFunc) => {

      });

    const history = createMemoryHistory('/search');
    let location = {state: undefined};
    wrapper = mount(<Movie history={history} location={location} />);
    expect(wrapper.find(Spinner).exists()).toEqual(true);
  });


});

import React from 'react';
import { shallow } from 'enzyme';
import MovieThumb from './MovieThumb';
import { Container, Col, Card, CardImg, Modal, ModalHeader, ModalBody } from 'reactstrap';

describe('<MovieThumb />', () => {
  it("should render 1 reactstrap Col component", () => {
    let wrapper = shallow(<MovieThumb data={{poster_path: "path"}} tmdbId={1} />);
    expect(wrapper.find(Col).length).toEqual(1);
  });

  it('should render a reactstrap Card component', () => {
    let wrapper = shallow(<MovieThumb data={{poster_path: "path"}} tmdbId={1} />);
    expect(wrapper.find(Card).exists()).toEqual(true);
  });

  it('should render a reactstrap Modal component', () => {
    let wrapper = shallow(<MovieThumb data={{poster_path: "path"}} tmdbId={1} />);
    expect(wrapper.find(Modal).exists()).toEqual(true);
  });

  it('toggle() should toggle state.modal boolean', () => {
    const wrapper = shallow(<MovieThumb data={{poster_path: "path"}} tmdbId={1} />);
    wrapper.instance().toggle();
    expect(wrapper.instance().state.modal).toEqual(true);
  });

  it('onModalOpen() should toggle state.modal boolean and set state.scrollTop', () => {
    const wrapper = shallow(<MovieThumb data={{poster_path: "path"}} tmdbId={1} />);
    wrapper.instance().onModalOpen();
    expect(wrapper.instance().state.modal).toEqual(true);
    expect(wrapper.instance().state.scrollTop).toEqual(0);
  });

  it('onModalClose() should set document scroll and call updateMyMovies function', () => {
    const wrapper = shallow(<MovieThumb data={{poster_path: "path"}} tmdbId={1} updateMyMovies={() => true} />);
    wrapper.instance().setState({scrollTop: 50});
    jest.useFakeTimers();
    wrapper.instance().onModalClose();
    jest.runAllTimers();
    expect(wrapper.instance().props.updateMyMovies()).toEqual(true);
    expect(document.documentElement.scrollTop).toEqual(50);
  });

  it('onModalClose() should only set document scroll if updateMyMovies prop doesn\'t exist', () => {
    const wrapper = shallow(<MovieThumb data={{poster_path: "path"}} tmdbId={1} />);
    wrapper.instance().setState({scrollTop: 60});
    jest.useFakeTimers();
    wrapper.instance().onModalClose();
    jest.runAllTimers();
    expect(wrapper.instance().props.updateMyMovies).toEqual(undefined);
    expect(document.documentElement.scrollTop).toEqual(60);
  });

  it('onModalClose() calls props function if state.remove is true', () => {
    let propsFn = jest.fn();
    const wrapper = shallow(<MovieThumb data={{poster_path: "path"}} tmdbId={1} removeMovie={propsFn} />);
    wrapper.setState({remove: true})
    wrapper.instance().onModalClose();
    expect(propsFn).toHaveBeenCalled();
  });

  it('should render null if poster path is null', () => {
    let wrapper = shallow(<MovieThumb data={{poster_path: null}} tmdbId={1} />);
    expect(wrapper.type()).toEqual(null);
  });

  it('checkIfDeleted sets state of remove', () => {
    let wrapper = shallow(<MovieThumb data={{poster_path: "path"}} tmdbId={1} />);
    wrapper.instance().checkIfDeleted(true);
    expect(wrapper.instance().state.remove).toEqual(true);
    wrapper.instance().checkIfDeleted(false);
    expect(wrapper.instance().state.remove).toEqual(false);
  });
});

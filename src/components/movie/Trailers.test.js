import React from 'react';
import { shallow } from 'enzyme';
import Trailers from './Trailers';
import { Row, Col, Collapse, Button } from 'reactstrap';

describe('<Trailers />', () => {
  let wrapper;

  beforeEach(() => {
    let videos = [
      {
        type: "Trailer",
        site: "YouTube",
        name: "trailer name",
        key: "key1"
      }
    ];

    wrapper = shallow(<Trailers videos={videos} />);
  });

  it("should render 1 outer reactstrap Col component and 1 for each video in video array", () => {
    expect(wrapper.find(Col).length).toEqual(2);
  });

  it("should render 1 reactstrap Button component", () => {
    expect(wrapper.find(Button).length).toEqual(1);
  });

  it("should render 1 reactstrap Collapse component", () => {
    expect(wrapper.find(Collapse).length).toEqual(1);
  });

  it("should render 1 reactstrap Row component", () => {
    expect(wrapper.find(Row).length).toEqual(1);
  });

  it("collapse should start out closed", () => {
    expect(wrapper.instance().state.collapse).toEqual(false);
  });

  it('toggle() should toggle state.collapse boolean', () => {
    wrapper.instance().toggle();
    expect(wrapper.instance().state.collapse).toEqual(true);
  });

  it('onEntering() should set state.colSize to 12', () => {
    wrapper.instance().onEntering();
    expect(wrapper.instance().state.colSize).toEqual("12");
  });

  it('onExited() should set state.colSize to auto', () => {
    wrapper.instance().onExited();
    expect(wrapper.instance().state.colSize).toEqual("auto");
  });

  it("should not render videos that aren't trailers from youtube", () => {
    let videos = [
      {
        type: "Trailer",
        site: "YouTube",
        name: "trailer name",
        key: "key1"
      },
      {
        type: "Trailer",
        site: "Other Site",
        name: "trailer name",
        key: "key1"
      },
      {
        type: "Not trailer",
        site: "YouTube",
        name: "trailer name",
        key: "key1"
      }
    ];

    let wrapper = shallow(<Trailers videos={videos} />);
    expect(wrapper.find(Col).length).toEqual(2);
  });

  it('should render null if no trailers given', () => {
    let wrapper = shallow(<Trailers videos={[]} />);
    expect(wrapper.type()).toEqual(null);
  });
});

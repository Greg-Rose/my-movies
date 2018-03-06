import React from 'react';
import { shallow } from 'enzyme';
import Cast from './Cast';
import { Row, Col, Collapse, Button } from 'reactstrap';

describe('<Cast />', () => {
  let wrapper;

  beforeEach(() => {
    let cast = [
      {
        profile_path: "path",
        name: "Actor 1",
        character: "Character 1"
      }
    ];

    wrapper = shallow(<Cast castData={cast} />);
  });

  it("should render 1 outer reactstrap Col component and 3 for each actor in cast array", () => {
    expect(wrapper.find(Col).length).toEqual(4);
  });

  it("should render 1 reactstrap Button component", () => {
    expect(wrapper.find(Button).length).toEqual(1);
  });

  it("should render 1 reactstrap Collapse component", () => {
    expect(wrapper.find(Collapse).length).toEqual(1);
  });

  it("should render 1 outer reactstrap Row component and 1 for each actor in cast", () => {
    expect(wrapper.find(Row).length).toEqual(2);
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

  it("should render blank avatar photo when profile path is null", () => {
    let cast = [
      {
        profile_path: null,
        name: "Actor 1",
        character: "Character 1"
      }
    ];

    let wrapper = shallow(<Cast castData={cast} />);
    expect(wrapper.find(Col).length).toEqual(4);
    let path = "http://www.jpi-oceans.eu/sites/jpi-oceans.eu/files/public/styles/portret/public/blank-profile-picture-973460_960_720_4.png?itok=efD9Alxa";
    expect(wrapper.find('img').html().includes(path)).toEqual(true);
  });

  it('should render null if no cast given', () => {
    let wrapper = shallow(<Cast castData={[]} />);
    expect(wrapper.type()).toEqual(null);
  });
});

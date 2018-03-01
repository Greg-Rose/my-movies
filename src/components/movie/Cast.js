import React, { Component } from 'react';
import { Row, Col, Collapse, Button } from 'reactstrap';
import './Cast.css';

class Cast extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onExited = this.onExited.bind(this);
    this.state = {
      collapse: false,
      colSize: "auto"
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  onEntering() {
    this.setState({ colSize: "12" });
  }

  onExited() {
    this.setState({ colSize: "auto" });
  }

  render() {
    if (this.props.castData.length === 0) { return null; }

    let cast = this.props.castData.map((member, index) => {
      let photo;
      if (member.profile_path === null) {
        photo = 'http://www.jpi-oceans.eu/sites/jpi-oceans.eu/files/public/styles/portret/public/blank-profile-picture-973460_960_720_4.png?itok=efD9Alxa';
      }
      else {
        photo = `https://image.tmdb.org/t/p/w185/${member.profile_path}`;
      }

      return (
        <Col key={index} xs="12" md="4" className="cast-member-outer-div">
          <Row className="align-items-center">
            <Col xs="4" md="4" className="cast-img">
              <img src={photo} alt="cast member" width="100" />
            </Col>
            <Col xs="8" md="8" className="text-left cast-info">
              <h6>Actor</h6>
              <p className="cast-name">{member.name}</p>
              <h6>Character</h6>
              <p className="cast-character">{member.character}</p>
            </Col>
          </Row>
        </Col>
      );
    });

    let btnArrow = this.state.collapse ? "btn-arrow arrow-open" : "btn-arrow";

    return (
      <Col xs={this.state.colSize} className="order-md-5">
        <Button color="secondary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Cast <span className={btnArrow}></span></Button>
        <Collapse isOpen={this.state.collapse} onEntering={this.onEntering} onExited={this.onExited}>
          <Row className="justify-content-center">
            {cast}
          </Row>
        </Collapse>
      </Col>
    );
  }
}

export default Cast;

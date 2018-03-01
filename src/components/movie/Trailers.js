import React, { Component } from 'react';
import { Row, Col, Collapse, Button } from 'reactstrap';
import './Trailers.css';

class Trailers extends Component {
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
    let trailers = this.props.videos.map((video, index) => {
      if (video.type !== "Trailer" || video.site !== "YouTube") { return null; }

      return (
        <Col key={index} xs="12" md="6">
          <div className="trailer-div embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              title={video.name}
              src={`https://www.youtube.com/embed/${video.key}`}
              allowFullScreen>
            </iframe>
          </div>
        </Col>
      );
    });

    if (trailers.length === 0) { return null; }

    let btnArrow = this.state.collapse ? "btn-arrow arrow-open" : "btn-arrow";

    return (
      <Col xs={this.state.colSize} className="order-md-6">
        <Button color="secondary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Trailers <span className={btnArrow}></span></Button>
        <Collapse isOpen={this.state.collapse} onEntering={this.onEntering} onExited={this.onExited}>
          <Row className="justify-content-center">
            {trailers}
          </Row>
        </Collapse>
      </Col>
    );
  }
}

export default Trailers;

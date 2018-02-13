import React, { Component } from 'react';
import { Collapse, Button } from 'reactstrap';
import './Trailers.css';

class Trailers extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onExited = this.onExited.bind(this);
    this.state = {
      collapse: false,
      divClass: "col-auto"
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  onEntering() {
    let className = "col-12";
    this.setState({ divClass: className });
  }

  onExited() {
    let className = "col-auto";
    this.setState({ divClass: className });
  }

  render() {
    let trailers = this.props.videos.map((video, index) => {
      if (video.type !== "Trailer" || video.site !== "YouTube") { return null; }

      return (
        <div key={index} className="col-12 col-md-6">
          <div className="trailer-div embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              title={video.name}
              src={`https://www.youtube.com/embed/${video.key}`}
              allowFullScreen>
            </iframe>
          </div>
        </div>
      );
    });

    if (trailers.length === 0) { return null; }

    let btnArrow = this.state.collapse ? "btn-arrow arrow-open" : "btn-arrow";

    return (
      <div className={`${this.state.divClass} order-md-6`}>
        <Button color="secondary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Trailers <span className={btnArrow}></span></Button>
        <Collapse isOpen={this.state.collapse} onEntering={this.onEntering} onExited={this.onExited}>
          <div className="row justify-content-center">
            {trailers}
          </div>
        </Collapse>
      </div>
    );
  }
}

export default Trailers;

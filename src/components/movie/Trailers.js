import React, { Component } from 'react';
import { Collapse, Button } from 'reactstrap';
import './Trailers.css';

class Trailers extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
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

    return (
      <div className="col-12 order-md-4">
        <Button color="secondary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Trailers</Button>
        <Collapse isOpen={this.state.collapse}>
          <div className="row justify-content-center" id="trailers-row">
            {trailers}
          </div>
        </Collapse>
      </div>
    );
  }
}

export default Trailers;

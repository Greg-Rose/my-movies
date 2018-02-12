import React, { Component } from 'react';
import { Collapse, Button } from 'reactstrap';
import './Cast.css';

class Cast extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
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
        <div key={index} className="col-12 col-md-4 cast-member-outer-div">
          <div className="row align-items-center">
            <div className="col-4 col-md-4 cast-img">
              <img src={photo} alt="cast member" width="100" />
            </div>
            <div className="col-8 col-md-8 text-left cast-info">
              <h6>Actor</h6>
              <p className="cast-name">{member.name}</p>
              <h6>Character</h6>
              <p className="cast-character">{member.character}</p>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="col-12 order-md-4">
        <Button color="secondary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Cast</Button>
        <Collapse isOpen={this.state.collapse}>
          <div className="row justify-content-center">
            {cast}
          </div>
        </Collapse>
      </div>
    );
  }
}

export default Cast;

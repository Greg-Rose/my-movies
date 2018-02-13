import React, { Component } from 'react';
import { Badge } from 'reactstrap';

class Rating extends Component {
  render() {
    return (
      <Badge className="movie-info-box">
        <h6 className="movie-info-box-title">Rated</h6>
        <h6 className="movie-info-box-body">{this.props.rating}</h6>
      </Badge>
    );
  }
}

export default Rating;

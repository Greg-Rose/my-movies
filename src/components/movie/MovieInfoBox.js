import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import './MovieInfoBox.css';

class MovieInfoBox extends Component {
  render() {
    return (
      <Badge className="movie-info-box">
        <h6 className="movie-info-box-title">{this.props.title}</h6>
        <h6 className="movie-info-box-body">{this.props.body}</h6>
      </Badge>
    );
  }
}

export default MovieInfoBox;

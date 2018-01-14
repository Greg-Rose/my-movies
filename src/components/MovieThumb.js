import React, { Component } from 'react';
import './MovieThumb.css';
import { Card, CardImg } from 'reactstrap';

class MovieThumb extends Component {
  render() {
    let poster = `https://image.tmdb.org/t/p/w154/${this.props.data.poster_path}`;

    return (
      <div className="col-6 col-md-4 col-lg-3">
        <Card className="mx-auto movie-card">
          <CardImg top src={poster} />
        </Card>
      </div>
    );
  }
}

export default MovieThumb;

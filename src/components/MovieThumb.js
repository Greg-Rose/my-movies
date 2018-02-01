import React, { Component } from 'react';
import './MovieThumb.css';
import { Card, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

class MovieThumb extends Component {
  render() {
    let poster = `https://image.tmdb.org/t/p/w154/${this.props.data.poster_path}`;
    let id = this.props.tmdbId;

    return (
      <div className="col-6 col-md-4 col-lg-3">
        <Card className="mx-auto movie-card">
          <Link to={{ pathname: "/movie", state: { id: id } }}>
            <CardImg top src={poster} />
          </Link>
        </Card>
      </div>
    );
  }
}

export default MovieThumb;

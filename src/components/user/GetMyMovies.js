import React, { Component } from 'react';
import MovieThumb from '../movie/MovieThumb';
import ApiRequest from '../../api/apiRequest';
import Spinner from '../layout/Spinner';

class GetMyMovies extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    let setMovies = (response) => {
      this.setState({ movies: response });
    };

    ApiRequest.get('/' + this.props.path, setMovies);
  }

  render() {
    if (this.state.movies.length === 0) { return <Spinner />; }

    let movies = this.state.movies.map(movieData => {
      return (
        <MovieThumb
          key={movieData.id}
          data={movieData}
          tmdbId={movieData.tmdb_id}
        />
      )
    })

    return (
      <div className="row">
        {movies}
      </div>
    );
  }
}

export default GetMyMovies;

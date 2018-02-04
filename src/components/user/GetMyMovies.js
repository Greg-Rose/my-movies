import React, { Component } from 'react';
import MovieThumb from '../movie/MovieThumb';
import ApiRequest from '../../api/apiRequest';

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

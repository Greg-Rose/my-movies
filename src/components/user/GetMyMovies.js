import React, { Component } from 'react';
import MovieThumb from '../movie/MovieThumb';
import ApiRequest from '../../api/apiRequest';
import Spinner from '../layout/Spinner';

class GetMyMovies extends Component {
  constructor() {
    super();
    this.state = {
      movies: null
    };
  }

  componentDidMount() {
    let setMovies = (response) => {
      this.setState({ movies: response });
    };

    ApiRequest.get('/' + this.props.path, setMovies);
  }

  render() {
    if (this.state.movies === null) { return <Spinner />; }

    let movies = this.state.movies.map(movieData => {
      return (
        <MovieThumb
          key={movieData.id}
          data={movieData}
          tmdbId={movieData.tmdb_id}
        />
      )
    })

    if (movies.length === 0) {
      let message = `Mark movies as "${this.props.name}" and they'll show up here.`;
      movies = (
        <div className="col text-center">
          <p>{message}</p>
        </div>
      );
    }

    return (
      <div className="row">
        {movies}
      </div>
    );
  }
}

export default GetMyMovies;

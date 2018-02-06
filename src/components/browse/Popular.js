import React, { Component } from 'react';
import MovieThumb from '../movie/MovieThumb';
import ApiRequest from '../../api/apiRequest';
import Spinner from '../layout/Spinner';

class Popular extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    let setMovies = (response) => {
      this.setState({
        page: response.page,
        movies: response.results,
        totalPages: response.total_pages
      });
    };

    ApiRequest.get('/movies/popular', setMovies);
  }

  render() {
    if (this.state.movies.length === 0) { return <Spinner />; }

    let movies = this.state.movies.map(movieData => {
      return (
        <MovieThumb
          key={movieData.id}
          data={movieData}
          tmdbId={movieData.id}
        />
      )
    })

    return (
      <div className="row text-center">
        {movies}
      </div>
    );
  }
}

export default Popular;

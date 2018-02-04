import React, { Component } from 'react';
import MovieThumb from '../movie/MovieThumb';
import ApiRequest from '../../api/apiRequest';

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
    let movies = this.state.movies.map(movieData => {
      return (
        <MovieThumb
          key={movieData.id}
          data={movieData}
          tmdbId={movieData.id}
        />
      )
    })

    if (movies.length === 0) {
      movies = (
        <div className="col">
          <i className="fa fa-spinner" aria-hidden="true"></i>
        </div>
      )
    }

    return (
      <div className="row text-center">
        {movies}
      </div>
    );
  }
}

export default Popular;

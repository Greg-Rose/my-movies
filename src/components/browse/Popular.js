import React, { Component } from 'react';
import authApi from '../../api/authApi';
import MovieThumb from '../movie/MovieThumb';
import { API_ROOT } from '../../api/apiConfig';

class Popular extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    fetch(API_ROOT + '/movies/popular', {
      headers: new Headers({
      'Authorization': authApi.getToken(),
      'Content-Type': 'application/json'
      })
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          page: response.page,
          movies: response.results,
          totalPages: response.total_pages
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
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

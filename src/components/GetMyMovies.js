import React, { Component } from 'react';
import authApi from '../api/authApi';
import MovieThumb from './MovieThumb';

class GetMyMovies extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/' + this.props.path, {
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
          movies: response
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

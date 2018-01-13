import React, { Component } from 'react';
import './Discover.css';
import authApi from '../api/authApi';
import MovieThumb from './MovieThumb';

class Discover extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/movies/discover', {
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
        <div className="col-12">
          <h1 id="discover-title">Discover</h1>
        </div>
        {movies}
      </div>
    );
  }
}

export default Discover;

import React, { Component } from 'react';
import './Discover.css';
import authApi from '../../api/authApi';
import MovieThumb from '../movie/MovieThumb';
import { API_ROOT } from '../../api/apiConfig';
import { FormGroup, Label, Input } from 'reactstrap';

class Discover extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: []
    };
    this.selectGenre = this.selectGenre.bind(this);
  }

  componentDidMount() {
    fetch(API_ROOT + '/genres', {
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
          genres: response
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));

    fetch(API_ROOT + '/movies/discover', {
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

  selectGenre(event) {
    let genre = event.target.options[event.target.selectedIndex].getAttribute("data-tmdb-id");

    fetch(API_ROOT + '/movies/discover?genres=' + genre, {
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
    let genres = this.state.genres.map(genre => {
      return (
        <option key={genre.tmdb_id} data-tmdb-id={genre.tmdb_id}>{genre.name}</option>
      )
    });
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
        <div className="col-12">
          <FormGroup>
            <Label for="genres">Genres</Label>
            <Input type="select" name="select" id="genres" onChange={this.selectGenre}>
              <option data-tmdb-id="">All</option>
              {genres}
            </Input>
          </FormGroup>
        </div>
        {movies}
      </div>
    );
  }
}

export default Discover;

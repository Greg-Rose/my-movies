import React, { Component } from 'react';
import './Discover.css';
import MovieThumb from '../movie/MovieThumb';
import { FormGroup, Label, Input } from 'reactstrap';
import ApiRequest from '../../api/apiRequest';

class Discover extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: []
    };
    this.selectGenre = this.selectGenre.bind(this);
    this.setMovies = this.setMovies.bind(this);
  }

  setMovies(response) {
    this.setState({
      page: response.page,
      movies: response.results,
      totalPages: response.total_pages
    });
  }

  componentDidMount() {
    let setGenres = (response) => {
      this.setState({ genres: response });
    };

    ApiRequest.get('/genres', setGenres);

    ApiRequest.get('/movies/discover', this.setMovies);
  }

  selectGenre(event) {
    let genre = event.target.options[event.target.selectedIndex].getAttribute("data-tmdb-id");

    ApiRequest.get('/movies/discover?genres=' + genre, this.setMovies);
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

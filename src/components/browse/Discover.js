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
    this.sortAndFilter = this.sortAndFilter.bind(this);
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

  sortAndFilter(event) {
    let genreSelect = document.getElementById('genres');
    let sortSelect = document.getElementById('sort');
    let genre = genreSelect[genreSelect.selectedIndex].value;
    let sort = sortSelect[sortSelect.selectedIndex].value;

    ApiRequest.get('/movies/discover?sort_by=' + sort + '&genres=' + genre, this.setMovies);
  }

  render() {
    let genres = this.state.genres.map(genre => {
      return <option key={genre.tmdb_id} value={genre.tmdb_id}>{genre.name}</option>
    });

    const sortList = [
      { name: "Popularity ↑", value: "popularity.asc" },
      { name: "Popularity ↓", value: "popularity.desc" }
    ];

    let sort = sortList.map((sort_by, index) => {
      return <option key={index} value={sort_by.value}>{sort_by.name}</option>
    });

    let movies = this.state.movies.map(movieData => {
      return (
        <MovieThumb key={movieData.id} data={movieData} tmdbId={movieData.id} />
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
          <FormGroup className="sort-filter">
            <Label for="genres">Genres</Label>
            <Input type="select" name="select" id="genres" onChange={this.sortAndFilter}>
              <option value="">All</option>
              {genres}
            </Input>
          </FormGroup>
          <FormGroup className="sort-filter">
            <Label for="sort">Sort</Label>
            <select name="select" id="sort" className="form-control" defaultValue="popularity.desc" onChange={this.sortAndFilter}>
              {sort}
            </select>
          </FormGroup>
        </div>
        {movies}
      </div>
    );
  }
}

export default Discover;

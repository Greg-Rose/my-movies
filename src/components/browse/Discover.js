import React, { Component } from 'react';
import './Discover.css';
import MovieThumb from '../movie/MovieThumb';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import ApiRequest from '../../api/apiRequest';
import Spinner from '../layout/Spinner';

class Discover extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      selectedGenre: '',
      sortBy: '',
      page: 1
    };
    this.selectGenre = this.selectGenre.bind(this);
    this.selectSort = this.selectSort.bind(this);
    this.setMovies = this.setMovies.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  setMovies(response) {
    let movies = response.results;
    if (response.page > 1) { movies = [...this.state.movies, ...response.results]; }
    this.setState({
      page: response.page,
      movies: movies,
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

  selectGenre() {
    let genreSelect = document.getElementById('genres');
    let genre = genreSelect[genreSelect.selectedIndex].value;
    this.setState({ selectedGenre: genre, page: 1 }, () => this.updateMovies());
  }

  selectSort() {
    let sortSelect = document.getElementById('sort');
    let sort = sortSelect[sortSelect.selectedIndex].value;
    this.setState({ sortBy: sort, page: 1 }, () => this.updateMovies());
  }

  nextPage() {
    let newPage = this.state.page + 1;
    if (newPage <= this.state.totalPages) {
      this.setState({ page: newPage }, () => this.updateMovies());
    }
  }

  updateMovies() {
    let genre = 'genres=' + this.state.selectedGenre;
    let sort = '&sort_by=' + this.state.sortBy;
    let page = '&page=' + this.state.page;

    ApiRequest.get('/movies/discover?' + genre + sort + page, this.setMovies);
  }

  render() {
    if (this.state.movies.length === 0) { return <Spinner />; }

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

    let preventDuplicates = [];

    let movies = this.state.movies.map(movieData => {
      if (preventDuplicates.includes(movieData.id)) { return null }
      else {
        preventDuplicates.push(movieData.id);
        return (
          <MovieThumb key={movieData.id} data={movieData} tmdbId={movieData.id} />
        )
      }
    })

    let loadMoreBtn;
    if (this.state.page < this.state.totalPages) {
      loadMoreBtn = (
        <div className="col-12">
          <Button color="secondary" onClick={this.nextPage} id="load-more-btn">More Movies</Button>
        </div>
      )
    }

    return (
      <div className="row text-center">
        <div className="col-12">
          <FormGroup className="sort-filter">
            <Label for="genres">Genres</Label>
            <Input type="select" name="select" id="genres" onChange={this.selectGenre}>
              <option value="">All</option>
              {genres}
            </Input>
          </FormGroup>
          <FormGroup className="sort-filter">
            <Label for="sort">Sort</Label>
            <select name="select" id="sort" className="form-control" defaultValue="popularity.desc" onChange={this.selectSort}>
              {sort}
            </select>
          </FormGroup>
        </div>
        {movies}
        {loadMoreBtn}
      </div>
    );
  }
}

export default Discover;

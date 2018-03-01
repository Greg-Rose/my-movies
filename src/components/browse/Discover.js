import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import './Discover.css';
import MovieThumb from '../movie/MovieThumb';
import { Row, Col, Label, Button } from 'reactstrap';
import ApiRequest from '../../api/apiRequest';
import Spinner from '../layout/Spinner';
import Select from 'react-select';

class Discover extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      selectedGenre: { value: "", label: "All" },
      sortBy: { label: "Popularity ↓", value: "popularity.desc" },
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

  selectGenre(selectedOption) {
    this.setState({ selectedGenre: selectedOption, page: 1 }, () => this.updateMovies());
  }

  selectSort(selectedOption) {
    this.setState({ sortBy: selectedOption, page: 1 }, () => this.updateMovies());
  }

  nextPage() {
    let newPage = this.state.page + 1;
    if (newPage <= this.state.totalPages) {
      this.setState({ page: newPage }, () => this.updateMovies());
    }
  }

  updateMovies() {
    let genre = 'genres=' + this.state.selectedGenre.value;
    let sort = '&sort_by=' + this.state.sortBy.value;
    let page = '&page=' + this.state.page;

    ApiRequest.get('/movies/discover?' + genre + sort + page, this.setMovies);
  }

  render() {
    if (this.state.movies.length === 0) { return <Spinner />; }

    let genres = this.state.genres.map(genre => {
      return { key: genre.tmdb_id, value: genre.tmdb_id, label: genre.name };
    });

    genres.unshift({ value: "", label: "All" });

    const sortList = [
      { label: "Popularity ↑", value: "popularity.asc" },
      { label: "Popularity ↓", value: "popularity.desc" }
    ];

    let preventDuplicates = [];

    let movies = this.state.movies.map(movieData => {
      if (preventDuplicates.includes(movieData.id)) { return null; }
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
        <Col xs="12">
          <Button color="secondary" onClick={this.nextPage} id="load-more-btn">More Movies</Button>
        </Col>
      )
    }

    const { selectedGenre } = this.state;
  	const genreValue = selectedGenre && selectedGenre.value;

    const { sortBy } = this.state;
  	const sortValue = sortBy && sortBy.value;

    return (
      <Row className="text-center">
        <Col xs="auto" className="sort-filter ml-auto">
          <Label for="genres">Genres</Label>
          <Select
            name="select"
            value={genreValue}
            onChange={this.selectGenre}
            options={genres}
            clearable={false}
            searchable={false}
          />
        </Col>
        <Col xs="auto" className="sort-filter mr-auto">
          <Label for="sort">Sort</Label>
          <Select
            name="select"
            value={sortValue}
            onChange={this.selectSort}
            options={sortList}
            clearable={false}
            searchable={false}
          />
        </Col>
        <div className="w-100"></div>
        {movies}
        {loadMoreBtn}
      </Row>
    );
  }
}

export default Discover;

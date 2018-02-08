import React, { Component } from 'react';
import MovieThumb from '../movie/MovieThumb';
import ApiRequest from '../../api/apiRequest';
import Spinner from '../layout/Spinner';
import { Button } from 'reactstrap';
import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      page: 1
    };
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
    if (this.props.location.state !== undefined) {
      ApiRequest.get('/movies/search?query=' + this.props.location.state.query, this.setMovies);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state !== undefined) {
      ApiRequest.get('/movies/search?query=' + nextProps.location.state.query, this.setMovies);
    }
  }

  nextPage() {
    let newPage = this.state.page + 1;
    if (newPage <= this.state.totalPages) {
      this.setState({ page: newPage }, () => this.updateMovies());
    }
  }

  updateMovies() {
    let page = '&page=' + this.state.page;

    ApiRequest.get('/movies/search?query=' + this.props.location.state.query + page, this.setMovies);
  }

  render() {
    if (this.state.movies.length === 0) { return <Spinner />; }

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
        <div className="col-12">
          <Button color="secondary" onClick={this.nextPage} id="load-more-btn">More Movies</Button>
        </div>
      )
    }

    return (
      <div className="row text-center" id="search-results">
        {movies}
        {loadMoreBtn}
      </div>
    );
  }
}

export default Search;

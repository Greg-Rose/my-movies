import React, { Component } from 'react';
import MovieThumb from '../movie/MovieThumb';
import ApiRequest from '../../api/apiRequest';
import Spinner from '../layout/Spinner';
import { Row, Col, Button } from 'reactstrap';

class Upcoming extends Component {
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
    ApiRequest.get('/movies/upcoming', this.setMovies);
  }

  nextPage() {
    let newPage = this.state.page + 1;
    if (newPage <= this.state.totalPages) {
      this.setState({ page: newPage }, () => this.updateMovies());
    }
  }

  updateMovies() {
    let page = '&page=' + this.state.page;

    ApiRequest.get('/movies/upcoming?' + page, this.setMovies);
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
        <Col xs="12">
          <Button color="secondary" onClick={this.nextPage} id="load-more-btn">More Movies</Button>
        </Col>
      )
    }

    return (
      <Row className="text-center">
        {movies}
        {loadMoreBtn}
      </Row>
    );
  }
}

export default Upcoming;

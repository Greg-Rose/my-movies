import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import MovieThumb from '../movie/MovieThumb';
import ApiRequest from '../../api/apiRequest';
import Spinner from '../layout/Spinner';

class GetMyMovies extends Component {
  constructor() {
    super();
    this.state = {
      movies: null
    };
    this.getMovies = this.getMovies.bind(this);
    this.setMovies = this.setMovies.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies() {
    ApiRequest.get('/' + this.props.path, this.setMovies);
  }

  setMovies(response) {
    let movies = response.movies;
    if (response.page > 1) { movies = [...this.state.movies, ...response.movies]; }
    this.setState({
      movies: movies,
      page: response.page,
      totalPages: response.total_pages
    });
  }

  nextPage() {
    let newPage = this.state.page + 1;
    if (newPage <= this.state.totalPages) {
      this.setState({ page: newPage }, () => this.updateMovies());
    }
  }

  updateMovies() {
    let page = '&page=' + this.state.page;

    ApiRequest.get('/' + this.props.path + '?' + page, this.setMovies);
  }

  removeMovie(id) {
    document.getElementById(id).remove();
  }

  render() {
    if (this.state.movies === null) { return <Spinner />; }

    let movies = this.state.movies.map(movieData => {
      return (
        <MovieThumb
          key={movieData.id}
          data={movieData}
          tmdbId={movieData.tmdb_id}
          type={this.props.name}
          removeMovie={this.removeMovie}
          id={movieData.id}
        />
      )
    })

    if (movies.length === 0) {
      let message = `Mark movies as "${this.props.name}" and they'll show up here.`;
      movies = (
        <Col className="text-center">
          <p className="my-movies-message">{message}</p>
        </Col>
      );
    }

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

export default GetMyMovies;

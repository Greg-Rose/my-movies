import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
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
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies() {
    let setMovies = (response) => {
      this.setState({ movies: response });
    };

    ApiRequest.get('/' + this.props.path, setMovies);
  }

  render() {
    if (this.state.movies === null) { return <Spinner />; }

    let movies = this.state.movies.map(movieData => {
      return (
        <MovieThumb
          key={movieData.id}
          data={movieData}
          tmdbId={movieData.tmdb_id}
          updateMyMovies={this.getMovies}
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

    return (
      <Row>
        {movies}
      </Row>
    );
  }
}

export default GetMyMovies;

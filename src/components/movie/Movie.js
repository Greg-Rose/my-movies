import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import './Movie.css';
import ApiRequest from '../../api/apiRequest';
import Spinner from '../layout/Spinner';
import ReleaseDate from '../../helpers/ReleaseDate';
import Cast from './Cast';
import Trailers from './Trailers';
import MovieInfoBox from './MovieInfoBox';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.markAsToWatch = this.markAsToWatch.bind(this);
    this.markAsWatched = this.markAsWatched.bind(this);
    this.setMyMovieStatus = this.setMyMovieStatus.bind(this);
  }

  componentWillMount() {
    let setMovie = (response) => {
      this.setState({
        movie: response,
        watched: response.watched,
        to_watch: response.to_watch,
        my_movie_id: response.my_movie_id
      });
    };

    ApiRequest.get('/movies/find/' + this.props.id, setMovie);
  }

  handleClick(watched, toWatch) {
    if (!this.state.watched && !this.state.to_watch) {
      let movie = {
        title: this.state.movie.title,
        release_date: this.state.movie.release_date,
        runtime: this.state.movie.runtime,
        tmdb_id: this.state.movie.id,
        poster_path: this.state.movie.poster_path,
        genres: this.state.movie.genres,
        watched: watched,
        to_watch: toWatch
      };

      ApiRequest.post('/my_movies', movie, this.setMyMovieStatus);
    }
    else if (watched === false && toWatch === false) {
      ApiRequest.delete('/my_movies/' + this.state.my_movie_id, this.setMyMovieStatus);
    }
    else {
      let request = {
        watched: watched,
        to_watch: toWatch
      };

      ApiRequest.put('/my_movies/' + this.state.my_movie_id, request, this.setMyMovieStatus);
    }
  }

  setMyMovieStatus(response) {
    this.setState({
      watched: response.watched,
      to_watch: response.to_watch,
      my_movie_id: response.id
    });
  }

  markAsWatched() {
    this.handleClick(!this.state.watched, this.state.to_watch);
  }

  markAsToWatch() {
    this.handleClick(this.state.watched, !this.state.to_watch);
  }

  render() {
    if (this.state === null) {
      return <Spinner />;
    }

    let title = this.state.movie.title;
    let poster = `https://image.tmdb.org/t/p/w300${this.state.movie.poster_path}`;
    let releaseDateData = new ReleaseDate(this.state.movie.release_dates.results, this.state.movie.release_date);
    let releaseDate = releaseDateData.getUSReleaseDate();
    let rating = releaseDateData.getUSRating();
    let overview = this.state.movie.overview;
    let runtime = this.state.movie.runtime;
    if (runtime === 0) {
      runtime = "N/A";
    }
    else {
      runtime += " minutes";
    }

    let genres = this.state.movie.genres.map((genre, index) => {
      let output = genre.name;
      if (index !== this.state.movie.genres.length - 1) {
        output += " | ";
      }
      return output;
    });

    if (genres.length === 0) { genres = "N/A"; }

    let watchedBtnIcon;
    let toWatchBtnIcon;

    if (this.state.watched === true) {
      watchedBtnIcon = <i className="fa fa-times" aria-hidden="true"></i>;
    } else {
      watchedBtnIcon = <i className="fa fa-plus" aria-hidden="true"></i>;
    }

    if (this.state.to_watch === true) {
      toWatchBtnIcon = <i className="fa fa-times" aria-hidden="true"></i>;
    } else {
      toWatchBtnIcon = <i className="fa fa-plus" aria-hidden="true"></i>;
    }


    return (
      <Row className="text-center justify-content-center" id="movie-div">
        <Col xs="12" id="movie-btns-div">
          <Button color="secondary" onClick={this.markAsToWatch}>{toWatchBtnIcon} To Watch</Button>
          <Button color="secondary" onClick={this.markAsWatched}>{watchedBtnIcon} Watched</Button>
        </Col>
        <Col xs="12">
          <img src={poster} alt="movie poster" />
        </Col>
        <Col xs="12">
          <h2 className="text-center">{title}</h2>
        </Col>
        <Col xs="12" md="8">
          <p>{overview}</p>
        </Col>
        <div className="w-100"></div>
        <Col xs="12" md="12" lg="auto" className="order-lg-2">
          <MovieInfoBox title="Genres" body={genres} />
        </Col>
        <Col xs="auto" md="auto" className="ml-auto order-md-1 movie-info-outer">
          <MovieInfoBox title="Release Date" body={releaseDate} />
        </Col>
        <Col xs="auto" md="auto" className="order-md-3 movie-info-outer">
          <MovieInfoBox title="Rated" body={rating} />
        </Col>
        <Col xs="auto" md="auto" className="mr-auto order-md-4 movie-info-outer">
          <MovieInfoBox title="Runtime" body={runtime} />
        </Col>
        <div className="w-100 order-md-4"></div>
        <Cast castData={this.state.movie.credits.cast} />
        <Trailers videos={this.state.movie.videos.results} />
      </Row>
    );
  }
}

export default Movie;

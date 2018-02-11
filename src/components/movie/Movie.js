import React, { Component } from 'react';
import './Movie.css';
import ApiRequest from '../../api/apiRequest';
import Spinner from '../layout/Spinner';
import getUSReleaseDate from '../../helpers/date';
import { Badge } from 'reactstrap';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.markAsToWatch = this.markAsToWatch.bind(this);
    this.markAsWatched = this.markAsWatched.bind(this);
    this.setMyMovieStatus = this.setMyMovieStatus.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state === undefined) {
      console.log(this.props.location.state);
      this.props.history.replace('/');
    }
    else {
      let setMovie = (response) => {
        this.setState({
          movie: response,
          watched: response.watched,
          to_watch: response.to_watch,
          my_movie_id: response.my_movie_id
        });
      };

      ApiRequest.get('/movies/find/' + this.props.location.state.id, setMovie);
    }
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
    if (this.props.location.state === undefined || this.state === null) {
      return <Spinner />;
    }

    let title = this.state.movie.title;
    let poster = `https://image.tmdb.org/t/p/w300/${this.state.movie.poster_path}`;
    let releaseDate = getUSReleaseDate(this.state.movie.release_dates.results, this.state.movie.release_date);
    let overview = this.state.movie.overview;
    let runtime = this.state.movie.runtime;
    let genres = this.state.movie.genres.map((genre, index) => {
      let output = genre.name;
      if (index !== this.state.movie.genres.length - 1) {
        output += " | ";
      }
      return output;
    });

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
      <div className="row text-center" id="movie-div">
        <div className="col-12" id="movie-btns-div">
          <button type="button" className="btn btn-secondary" onClick={this.markAsToWatch}>{toWatchBtnIcon} To Watch</button>
          {" "}
          <button type="button" className="btn btn-secondary" onClick={this.markAsWatched}>{watchedBtnIcon} Watched</button>
        </div>
        <div className="col-12">
          <img src={poster} alt="movie poster" />
        </div>
        <div className="col-12">
          <h2 className="text-center">{title}</h2>
        </div>
        <div className="col-12 col-md-8 offset-md-2">
          <p>{overview}</p>
        </div>
        <div className="w-100"></div>
        <div className="col-12 col-md-auto order-md-2">
          <Badge className="movie-info-box">
            <h6 className="movie-info-box-title">Genres</h6>
            <h6 className="movie-info-box-body">{genres}</h6>
          </Badge>
        </div>
        <div className="col-auto col-md-auto ml-auto order-md-1">
          <Badge className="movie-info-box">
            <h6 className="movie-info-box-title">Release Date</h6>
            <h6 className="movie-info-box-body">{releaseDate}</h6>
          </Badge>
        </div>
        <div className="col-auto col-md-auto mr-auto order-md-3">
          <Badge className="movie-info-box">
            <h6 className="movie-info-box-title">Runtime</h6>
            <h6 className="movie-info-box-body">{runtime} minutes</h6>
          </Badge>
        </div>
      </div>
    );
  }
}

export default Movie;

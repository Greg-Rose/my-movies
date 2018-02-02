import React, { Component } from 'react';
import './Movie.css';
import authApi from '../../api/authApi';
import { API_ROOT } from '../../api/apiConfig';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.markAsToWatch = this.markAsToWatch.bind(this);
    this.markAsWatched = this.markAsWatched.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state === undefined) {
      console.log(this.props.location.state);
      this.props.history.replace('/');
    }
    else {
      fetch(API_ROOT + '/movies/find/' + this.props.location.state.id, {
        headers: new Headers({
          'Authorization': authApi.getToken(),
          'Content-Type': 'application/json'
        })
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
                error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => response.json())
        .then(response => {
          this.setState({
            movie: response,
            watched: response.watched,
            to_watch: response.to_watch,
            my_movie_id: response.my_movie_id
          });
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
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

      fetch(API_ROOT + '/my_movies', {
        method: 'post',
        headers: new Headers({
          'Authorization': authApi.getToken(),
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(movie)
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
                error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => response.json())
        .then(response => {
          this.setState({
            watched: response.watched,
            to_watch: response.to_watch,
            my_movie_id: response.id
          });
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
    else {
      let request = {
        watched: watched,
        to_watch: toWatch
      };

      fetch(API_ROOT + '/my_movies/' + this.state.my_movie_id, {
        method: 'put',
        headers: new Headers({
          'Authorization': authApi.getToken(),
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(request)
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
                error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => {
          if (response.status === 204) {
            this.setState({
              watched: false,
              to_watch: false,
              my_movie_id: undefined
            });
          } else {
            return response.json();
          }
        })
        .then(response => {
          if (response !== undefined) {
            this.setState({
              watched: response.watched,
              to_watch: response.to_watch,
              my_movie_id: response.id
            });
          }
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  markAsWatched() {
    this.handleClick(!this.state.watched, this.state.to_watch);
  }

  markAsToWatch() {
    this.handleClick(this.state.watched, !this.state.to_watch);
  }

  render() {
    if (this.props.location.state === undefined || this.state === null) {
      return null;
    }

    let title = this.state.movie.title;
    let poster = `https://image.tmdb.org/t/p/w300/${this.state.movie.poster_path}`;
    let releaseDate = this.state.movie.release_date;
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
      <div className="col-12 text-center" id="movie-div">
        <div id="movie-btns-div">
          <button type="button" className="btn btn-light" onClick={this.markAsWatched}>{watchedBtnIcon} Watched</button>
          {" "}
          <button type="button" className="btn btn-light" onClick={this.markAsToWatch}>{toWatchBtnIcon} To Watch</button>
        </div>
        <img src={poster} alt="movie poster" />
        <h2 className="text-center">{title}</h2>
        <p>{overview}</p>
        <p>Release Date: {releaseDate}</p>
        <p>Runtime: {runtime} minutes</p>
        <p>Genres: {genres}</p>
      </div>
    );
  }
}

export default Movie;

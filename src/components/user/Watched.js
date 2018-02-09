import React, { Component } from 'react';
import GetMyMovies from './GetMyMovies';

class Watched extends Component {
  render() {
    return (
      <GetMyMovies name="Watched" path="my_watched_movies" />
    );
  }
}

export default Watched;

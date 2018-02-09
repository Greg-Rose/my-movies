import React, { Component } from 'react';
import GetMyMovies from './GetMyMovies';

class ToWatch extends Component {
  render() {
    return (
      <GetMyMovies name="To Watch" path="my_movies_to_watch" />
    );
  }
}

export default ToWatch;

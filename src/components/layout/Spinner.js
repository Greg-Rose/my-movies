import React, { Component } from 'react';
import './Spinner.css';

class Spinner extends Component {
  render() {
    return (
      <div className="row text-center">
        <div className="col">
          <i className="fa fa-spinner" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

export default Spinner;

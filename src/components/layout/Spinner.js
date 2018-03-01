import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './Spinner.css';

class Spinner extends Component {
  render() {
    return (
      <Row className="text-center">
        <Col>
          <i className="fa fa-spinner" aria-hidden="true"></i>
        </Col>
      </Row>
    )
  }
}

export default Spinner;

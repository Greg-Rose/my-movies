import React, { Component } from 'react';
import './MovieThumb.css';
import { Container, Col, Card, CardImg, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Movie from './Movie';

class MovieThumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      scrollTop: 0
    };
    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onModalOpen() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    this.setState({
      scrollTop: scrollTop,
      modal: !this.state.modal
    });
  }

  onModalClose() {
    let timer = setInterval(() => {
      document.documentElement.scrollTop = document.body.scrollTop = this.state.scrollTop;
      clearInterval(timer);
    }, 1);

    // refresh My Movies
    if (this.props.hasOwnProperty('updateMyMovies')) {
      this.props.updateMyMovies();
    }
  }

  render() {
    if (this.props.data.poster_path === null) { return null; }

    let poster = `https://image.tmdb.org/t/p/w154/${this.props.data.poster_path}`;
    let id = this.props.tmdbId;

    return (
      <Col xs="6" md="4" lg="3">
        <Card className="mx-auto movie-card" onClick={this.onModalOpen}>
          <CardImg top src={poster} className="thumb-img" />
        </Card>
        <Modal modalClassName="movie-modal" isOpen={this.state.modal} toggle={this.toggle} onClosed={this.onModalClose}>
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <Container>
              <Movie id={id} />
            </Container>
          </ModalBody>
        </Modal>
      </Col>
    );
  }
}

export default MovieThumb;

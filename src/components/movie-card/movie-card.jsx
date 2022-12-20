import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className='mb-4 ml-3 mr-3'>
        <Card.Img height="400px" variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className='text-truncate mb-2'>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className='mb-1' variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func
};

// ExampleCarouselImage.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExampleCarouselImage = ({ imgSrc, text }) => {
  return (
    <img
      className="d-block w-100"
      src={imgSrc}
      alt={text}
    />
  );
};

export default ExampleCarouselImage;

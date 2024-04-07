// StarRating.js

import React, { useState } from 'react';

const StarRating = ({ initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (newRating) => {
    setRating(newRating);
    onRatingChange(newRating); // Call the parent component's function to handle the rating change
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'gray' }}
          onClick={() => handleClick(index + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;

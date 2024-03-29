import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);
  
  return (
    <div style={{ display: 'flex' }}>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i} >
            <input
              type='radio'
              name='rating'
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              style={{ display: 'none' }} 
            />
            <FaStar
              className='star'
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: 'pointer' }} 
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;

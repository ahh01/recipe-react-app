import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const Stars = ({
  stars = 0,
  setRatedStarMatchingReceipId,
  ratedStars,
  matchingId,
}) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <button
        key={index}
        onClick={() => {
          setRatedStarMatchingReceipId({ index, matchingId });
        }}
      >
        <span>
          {stars > number ? (
            <BsStarFill />
          ) : stars > index ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
      </button>
    );
  });
  return (
    <div className='stars'>
      <div className='stars'>{tempStars}</div>
    </div>
  );
};
export default Stars;

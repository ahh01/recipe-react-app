import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const Stars = ({
  stars = 0,
  setRatedStarMatchingReceipId,
  ratedStars,
  matchingId,
}) => { console.log(ratedStars, matchingId)
  
  let updatedStars = stars
  if ( ratedStars.matchingId == matchingId)
  {
     updatedStars = ratedStars.index
  } 
   
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
          {updatedStars > number ? (
            <BsStarFill />
          ) : updatedStars > index ? (
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

import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const Stars = ({
  stars = 0,
  setRatedStarMatchingReceipId,
  ratedStars,
  matchingId,
}) => {
  let updatedStars = stars;
  const matchedRating = ratedStars.find(
    (rating) => rating.matchingId == matchingId
  );
  //ratedStars && ratedStars.matchingId == matchingId
  if (matchedRating) {
    console.log(matchedRating.indexStartFromZeroButValueFromOne);
    updatedStars = matchedRating.indexStartFromZeroButValueFromOne;
  }

  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <button
        key={index}
        onClick={() => {
          const indexStartFromZeroButValueFromOne = index + 1;
          setRatedStarMatchingReceipId({
            indexStartFromZeroButValueFromOne,
            matchingId,
          });
        }}
      >
        <span>
          {updatedStars > number ? (
            <BsStarFill />
          ) : updatedStars > index + 1 ? (
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

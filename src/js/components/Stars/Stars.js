import React from 'react';
import PropTypes from 'prop-types';
import {IoIosStar, IoIosStarHalf, IoIosStarOutline} from 'react-icons/io';

const Stars = (props) => {
  const stars = [];

  let score = Math.round(props.score * 2) / 2;
  if (score === 0) {
    stars.push(<IoIosStarOutline key={stars.length} />);
  } else {
    while (score >= 1) {
      stars.push(<IoIosStar key={stars.length} />)
      score--;
    }

    if (score !== 0)
      stars.push(<IoIosStarHalf key={stars.length} />)
  }

  return (
    <>{stars}</>
  );
}

Stars.propTypes = {
  score: PropTypes.number.isRequired
};

export default Stars;

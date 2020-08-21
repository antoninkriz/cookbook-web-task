import React from 'react';
import PropTypes from 'prop-types';

// Components
import {IonStar, IonStarHalf, IonStarOutline} from '../Icons';

const Stars = (props) => {
  const stars = [];

  let score = Math.round(props.score * 2) / 2;
  if (score === 0) {
    stars.push(<IonStarOutline key={stars.length} />);
  } else {
    while (score >= 1) {
      stars.push(<IonStar key={stars.length} />)
      score--;
    }

    if (score !== 0)
      stars.push(<IonStarHalf key={stars.length} />)
  }

  return (
    <>{stars}</>
  );
}

Stars.propTypes = {
  score: PropTypes.number.isRequired
};

export default Stars;

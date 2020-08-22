import React from 'react';
import PropTypes from 'prop-types';

const DetailError = (props) => (
  <div className='detail detail--error'>
    <span className='detail__error'>{props.error || '404'}</span>
    <span className='detail__info'>Chyba při načítání receptu</span>
  </div>
);

DetailError.propTypes = {
  error: PropTypes.number
}

export default DetailError;

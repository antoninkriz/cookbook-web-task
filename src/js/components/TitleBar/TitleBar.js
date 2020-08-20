import React from 'react';
import PropTypes from 'prop-types';

import {IoIosArrowBack} from 'react-icons/io';

import classNames from '../../utils/classNames';

const TitleBar = (props) => {
  return (
    <header className={classNames({
      'bar': true,
      'bar--white': props.type === 'white',
      'bar--transparent': props.type === 'transparent'
    })}>
      <div className='bar__item bar__item--left'>
        {props.showBack &&
        <>
          <IoIosArrowBack /> Zpět
        </>
        }
      </div>
      <span className='bar__title'>{props.title}</span>
      <div className='bar__item bar__item--right'>
        {props.right}
      </div>
    </header>
  );
}

TitleBar.defaultProps = {
  showBack: false,
  right: null,
  title: '',
  type: 'white'
}

TitleBar.propTypes = {
  showBack: PropTypes.bool.isRequired,
  right: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  title: PropTypes.string,
  type: PropTypes.oneOf(['white', 'transparent'])
}

export default TitleBar;

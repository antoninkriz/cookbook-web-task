import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

// Utils
import classNames from '../../utils/classNames';

// Components
import {IonChevronBack} from '../Icons';

const TitleBar = (props) => {
  return (
    <header className={classNames({
      'bar': true,
      'bar--white': props.type === 'white',
      'bar--transparent': props.type === 'transparent',
      [props.className]: !!props.className
    })}>
      <div className='bar__item bar__item--left' onClick={() => props.history.goBack()}>
        {
          props.showBack &&
          <>
            <IonChevronBack className='bar__item__icon' />
            <span className='bar__item__label'>Zpět</span>
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
  type: 'white',
  className: ''
}

TitleBar.propTypes = {
  showBack: PropTypes.bool.isRequired,
  right: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  title: PropTypes.string,
  type: PropTypes.oneOf(['white', 'transparent']),
  className: PropTypes.string
}

export default withRouter(TitleBar);

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// Components
import {IonTime} from '../../components/Icons';
import Stars from '../../components/Stars/Stars';

// Files
import image from '../../../images/image.jpg';

const RecipeItem = (props) => {
  const recipe = props.recipe;

  return (
    <Link className='recipes__item' to={`/recipe/${recipe.id}`}>
      <article className='recipes__item__wrapper'>
        <img className='recipes__item__wrapper__image' src={image} alt={recipe.name} />
        <div className='recipes__item__wrapper__content'>
          <h3 className='recipes__item__wrapper__content__title'>{recipe.name}</h3>
          <div className='recipes__item__wrapper__content__stars'>
            <Stars className='recipes__item__wrapper__content__stars__icon' score={recipe.score} />
          </div>
          <div className='recipes__item__wrapper__content__time'>
            <IonTime className='recipes__item__wrapper__content__time__icon' />
            <span className='recipes__item__wrapper__content__time__label'>{recipe.duration} min.</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

RecipeItem.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired
  }).isRequired
}

export default RecipeItem;

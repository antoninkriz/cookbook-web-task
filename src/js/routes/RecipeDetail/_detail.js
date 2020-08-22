import image from '../../../images/image.jpg';
import Stars from '../../components/Stars/Stars';
import {IonStar, IonTime} from '../../components/Icons';
import classNames from '../../utils/classNames';
import PropTypes from 'prop-types';
import React from 'react';

const Detail = (props) => {
  const recipe = props.recipe;

  return (
    <article className='detail'>
      <div className='detail__image' style={{backgroundImage: `url(${image}`}} />
      <div className='detail__content'>
        <h1 className='detail__content__title'>{recipe.name}</h1>
        <div className='detail__content__info'>
          <div className='detail__content__info__stars'>
            <Stars score={recipe.score} />
          </div>
          <div className='detail__content__info__time'>
            <IonTime className='detail__content__info__time__icon' />
            <span className='detail__content__info__time__label'>{recipe.duration} min.</span>
          </div>
        </div>
        <div className='detail__content__text'>
          <p className='detail__content__text__paragraph detail__content__text__paragraph--bold'>{recipe.info}</p>
          <h2 className='detail__content__text__title'>Ingredience</h2>
          <ul className='detail__content__text__list'>
            {
              recipe.ingredients.map((x, i) => <li className='detail__content__text__list__item' key={i}>{x}</li>)
            }
          </ul>
          <h2 className='detail__content__text__title'>Příprava jídla</h2>
          <p className='detail__content__text__paragraph'>{recipe.description}</p>
        </div>
        <div className='detail__content__rate'>
          <span className='detail__content__rate__text'>{props.rated[recipe.id] ? 'Ohodnoceno' : 'Ohodnoť tento recept'}</span>
          <div className={classNames({
            'detail__content__rate__stars': true,
            'detail__content__rate__stars--rated': !!props.rated[recipe.id],
          })}>
            <IonStar onClick={() => props.rateRecipe(5)}
                     className={classNames({
                       'detail__content__rate__stars__icon': true,
                       'detail__content__rate__stars__icon--rated': props.rated[recipe.id] >= 5
                     })} />
            <IonStar onClick={() => props.rateRecipe(4)}
                     className={classNames({
                       'detail__content__rate__stars__icon': true,
                       'detail__content__rate__stars__icon--rated': props.rated[recipe.id] >= 4
                     })} />
            <IonStar onClick={() => props.rateRecipe(3)}
                     className={classNames({
                       'detail__content__rate__stars__icon': true,
                       'detail__content__rate__stars__icon--rated': props.rated[recipe.id] >= 3
                     })} />
            <IonStar onClick={() => props.rateRecipe(2)}
                     className={classNames({
                       'detail__content__rate__stars__icon': true,
                       'detail__content__rate__stars__icon--rated': props.rated[recipe.id] >= 2
                     })} />
            <IonStar onClick={() => props.rateRecipe(1)}
                     className={classNames({
                       'detail__content__rate__stars__icon': true,
                       'detail__content__rate__stars__icon--rated': props.rated[recipe.id] >= 1
                     })} />
          </div>
        </div>
      </div>
    </article>
  );
}

Detail.propTypes = {
  rateRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    info: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  rated: PropTypes.objectOf(PropTypes.number).isRequired
}

export default Detail;

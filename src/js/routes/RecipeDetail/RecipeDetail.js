import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

// Redux
import {getRecipeDetail, postRecipeRating} from "../../redux/actions/recipesActions";

// Components
import TitleBar from "../../components/TitleBar/TitleBar";
import {IonAddCircle, IonStar, IonTime} from "../../components/Icons";

// Files
import image from '../../../images/image.jpg';
import Stars from "../../components/Stars/Stars";
import classNames from "../../utils/classNames";

class RecipeDetail extends React.Component {
  componentDidMount() {
    this.props.getRecipeDetail(this.props.match.params.id);
  }

  rateRecipe(score) {
    this.props.postRecipeRating(this.props.match.params.id, score);
  }

  render() {
    const addRecipeButton = (
      <IonAddCircle className='bar__item__icon' onClick={() => alert('Add a recipe')} />
    );

    const recipe = this.props.details[this.props.match.params.id];

    let article;
    if (recipe)
      if (recipe.error)
        article = (
          <div className='detail detail--error'>
            <span className='detail__error'>{recipe.error || '404'}</span>
            <span className='detail__info'>Chyba při načítání receptu</span>
          </div>
        );
      else
        article = (
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
                <span className='detail__content__rate__text'>{this.props.rated[recipe.id] ? 'Ohodnoceno' : 'Ohodnoť tento recept'}</span>
                <div className={classNames({
                  'detail__content__rate__stars': true,
                  'detail__content__rate__stars--rated': !!this.props.rated[recipe.id],
                })}>
                  <IonStar onClick={() => this.rateRecipe(5)}
                           className={classNames({
                             'detail__content__rate__stars__icon': true,
                             'detail__content__rate__stars__icon--rated': this.props.rated[recipe.id] >= 5
                           })} />
                  <IonStar onClick={() => this.rateRecipe(4)}
                           className={classNames({
                             'detail__content__rate__stars__icon': true,
                             'detail__content__rate__stars__icon--rated': this.props.rated[recipe.id] >= 4
                           })} />
                  <IonStar onClick={() => this.rateRecipe(3)}
                           className={classNames({
                             'detail__content__rate__stars__icon': true,
                             'detail__content__rate__stars__icon--rated': this.props.rated[recipe.id] >= 3
                           })} />
                  <IonStar onClick={() => this.rateRecipe(2)}
                           className={classNames({
                             'detail__content__rate__stars__icon': true,
                             'detail__content__rate__stars__icon--rated': this.props.rated[recipe.id] >= 2
                           })} />
                  <IonStar onClick={() => this.rateRecipe(1)}
                           className={classNames({
                             'detail__content__rate__stars__icon': true,
                             'detail__content__rate__stars__icon--rated': this.props.rated[recipe.id] >= 1
                           })} />
                </div>
              </div>
            </div>
          </article>
        );
    else
      article = (
        <div className='detail detail--skeleton'>
          <div className='detail__image detail__image--skeleton' />
          <div className='detail__content detail__content--skeleton'>
            <div className='detail__content__title detail__content__title--skeleton'/>
            <div className='detail__content__info detail__content__info--skeleton'>
              <div className='detail__content__info__stars detail__content__info__stars--skeleton' />
              <div className='detail__content__info__time detail__content__info__time--skeleton' />
            </div>
            <div className='detail__content__text detail__content__text--skeleton'>
              <div className='detail__content__text__paragraph detail__content__text__paragraph--bold detail__content__text__paragraph--skeleton' />
              <div className='detail__content__text__title detail__content__text__title--skeleton' />
              <div className='detail__content__text__list detail__content__text__list--skeleton'>
                <div className='detail__content__text__list__item detail__content__text__list__item--skeleton' />
                <div className='detail__content__text__list__item detail__content__text__list__item--skeleton' />
                <div className='detail__content__text__list__item detail__content__text__list__item--skeleton' />
                <div className='detail__content__text__list__item detail__content__text__list__item--skeleton' />
                <div className='detail__content__text__list__item detail__content__text__list__item--skeleton' />
              </div>
              <div className='detail__content__text__title detail__content__text__title--skeleton' />
              <div className='detail__content__text__paragraph detail__content__text__paragraph--skeleton' />
            </div>
            <div className='detail__content__rate detail__content__rate--skeleton'>
              <div className='detail__content__rate__text detail__content__rate__text--skeleton' />
              <div className='detail__content__rate__stars detail__content__rate__stars--skeleton' />
            </div>
          </div>
        </div>
  );

    return (
      <>
        <TitleBar className='bar--detail' type={'transparent'} showBack={true} right={addRecipeButton} />
        {article}
      </>
    );
  }
}

RecipeDetail.propTypes = {
  getRecipeDetail: PropTypes.func.isRequired,
  postRecipeRating: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  details: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.number,
    duration: PropTypes.number,
    info: PropTypes.string,
    description: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  rated: PropTypes.objectOf(PropTypes.number).isRequired
};

const mapStateToProps = (state) => ({
  loading: state.ui.loading,
  details: state.recipes.details,
  rated: state.recipes.rated
});

export default connect(
  mapStateToProps,
  {getRecipeDetail, postRecipeRating}
)(RecipeDetail);

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {IoIosAddCircleOutline, IoMdTime} from 'react-icons/io';
import {ITEMS_PER_PAGE} from '../../consts';
import {getRecipesList} from '../../redux/actions/recipesActions';
import TitleBar from '../../components/TitleBar/TitleBar';
import image from '../../../images/image.png';
import Stars from "../../components/Stars/Stars";

class RecipesList extends React.Component {
  componentDidMount() {
    this.props.getRecipesList(0);
  }

  render() {
    const skeletonsCount = Math.floor(ITEMS_PER_PAGE / 2);
    const skeletons = new Array(skeletonsCount).fill(undefined).map((v, i) => i);

    const addRecipeButton = (
      <IoIosAddCircleOutline onClick={() => console.log('aaaaa')} />
    );

    return (
      <>
        <TitleBar title='Recepty' showBack={true} right={addRecipeButton} />
        <div className='recipes'>
          {
            this.props.recipesList.map(recipe =>
              <article className='recipes__item' key={recipe.id}>
                <img className='recipes__item__image' src={image} alt='image' />
                <div className='recipes__item__content'>
                  <h3 className='recipes__item__content__title'>{recipe.name}</h3>
                  <div className='recipes__item__content__stars'>
                    <Stars score={recipe.score} />
                  </div>
                  <span>
                    <IoMdTime /> {recipe.duration} min.
                  </span>
                </div>
              </article>
            )
          }
          {this.props.loading &&
          skeletons.map(key =>
            <p key={key}>Skeleton {key}</p>
          )
          }
        </div>
      </>
    );
  }
}

RecipesList.propTypes = {
  getRecipesList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  endOfRecipesList: PropTypes.bool.isRequired,
  recipesList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired
  })).isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.ui.loading,
  endOfRecipesList: state.recipes.endOfList,
  recipesList: state.recipes.list
});

export default connect(
  mapStateToProps,
  {getRecipesList}
)(RecipesList);

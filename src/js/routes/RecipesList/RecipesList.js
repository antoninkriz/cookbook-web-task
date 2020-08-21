import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {IonAddCircle} from '../../components/Icons';
import InfiniteScroll from 'react-infinite-scroll-component';

// Utils
import {ITEMS_PER_PAGE} from '../../consts';
import {initArrayIntegers} from '../../utils/araryInit';

// Redux
import {getRecipesList} from '../../redux/actions/recipesActions';

// Components
import TitleBar from '../../components/TitleBar/TitleBar';
import RecipeItem from './_recipeItem';
import RecipeSkeleton from './_recipeSkeleton';

class RecipesList extends React.Component {
  componentDidMount() {
    this.props.getRecipesList(0);
  }

  render() {
    const {endOfRecipesList, recipesList} = this.props;

    const skeletonsCount = Math.floor(ITEMS_PER_PAGE / 2);
    const skeletons =<>{initArrayIntegers(skeletonsCount).map(key => <RecipeSkeleton key={key}/>)}</>

    const addRecipeButton = (
      <IonAddCircle className='bar__item__icon' onClick={() => alert('Add a recipe')}/>
    );

    return (
      <>
        <TitleBar title='Recepty' showBack={true} right={addRecipeButton}/>
        <InfiniteScroll
          className='recipes'
          dataLength={recipesList.length}
          next={() => this.props.getRecipesList(Math.floor(recipesList.length / ITEMS_PER_PAGE))}
          hasMore={!endOfRecipesList}
          loader={skeletons}>
          {
            recipesList.map(recipe => <RecipeItem recipe={recipe} key={recipe.id}/>)
          }
        </InfiniteScroll>
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

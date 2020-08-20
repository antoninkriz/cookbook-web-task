import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getRecipesList} from '../../redux/actions/recipesActions';
import {ITEMS_PER_PAGE} from "../../consts";

class RecipesList extends React.Component {
  componentDidMount() {
    this.props.getRecipesList(0);
  }

  render() {
    const skeletonsCount = Math.floor(ITEMS_PER_PAGE / 2);
    const skeletons = new Array(skeletonsCount).fill(undefined).map((v, i) => i);
    return (
      <div>
        <div>
          {
            this.props.recipesList.map(recipe =>
              <p key={recipe.id}>{recipe.name}</p>
            )
          }
          {this.props.loading &&
          skeletons.map(key =>
            <p key={key}>Skeleton {key}</p>
          )
          }
        </div>
      </div>
    );
  }
}

RecipesList.propTypes = {
  getRecipesList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  endOfRecipesList: PropTypes.bool.isRequired,
  recipesList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
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

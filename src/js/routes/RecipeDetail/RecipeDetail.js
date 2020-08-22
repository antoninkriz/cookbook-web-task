import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

// Redux
import {getRecipeDetail, postRecipeRating} from '../../redux/actions/recipesActions';

// Components
import TitleBar from '../../components/TitleBar/TitleBar';
import Detail from './_detail';
import DetailError from './_detailError';
import DetailSkeleton from './_detailSkeleton';
import {IonAddCircle} from '../../components/Icons';

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);

    this.rateRecipe = this.rateRecipe.bind(this);
  }


  componentDidMount() {
    this.props.getRecipeDetail(this.props.match.params.id);
  }

  rateRecipe(score) {
    this.props.postRecipeRating(this.props.match.params.id, score);
  }

  render() {
    const addRecipeButton = (
      <Link className='bar__item__link' to='/create'>
        <IonAddCircle className='bar__item__link__icon' />
      </Link>
    );

    const recipe = this.props.details[this.props.match.params.id];

    return (
      <>
        <TitleBar className='bar--detail' type='transparent' showBack={true} right={addRecipeButton} />
        {
          !recipe
            ? <DetailSkeleton />
            : (
              recipe.error
                ? <DetailError error={recipe.error} />
                : <Detail recipe={recipe} rated={this.props.rated} rateRecipe={this.rateRecipe} />
            )
        }
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
    error: PropTypes.number
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

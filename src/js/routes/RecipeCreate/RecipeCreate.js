import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from "react-router";
import {connect} from 'react-redux';

// Utils
import classNames from '../../utils/classNames';

// Redux
import {postRecipeNew} from '../../redux/actions/recipesActions';
import {createRecipeClear} from '../../redux/actions/uiActions';

// Components
import TitleBar from '../../components/TitleBar/TitleBar';
import {IonAdd} from '../../components/Icons';

class RecipeCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      info: '',
      ingredients: [''],
      duration: 0,
      description: '',
      error: {
        name: false,
        info: false,
        ingredients: [false],
        duration: false,
        description: false
      }
    };

    this.addIngredient = this.addIngredient.bind(this);
    this.change = this.change.bind(this);
    this.validate = this.validate.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillUnmount() {
    this.props.createRecipeClear();
  }

  change(event) {
    const {name, value} = event.target;
    const ingredientsName = 'ingredients-';

    if (!name.startsWith(ingredientsName)) {
      this.setState(() => ({
        [name]: name === 'duration' ? Number.parseInt(value) : value
      }));
    } else {
      this.setState(s => {
        const ingredients = [...s.ingredients];
        ingredients[name.substring(ingredientsName.length)] = value;

        return {
          ingredients: ingredients
        };
      });
    }

    this.validate(name, value);
  }

  validate(name, value) {
    const ingredientsName = 'ingredients-';

    if (name === 'duration') {
      const ok = !(Number(value) > 0);

      this.setState(s => ({
        error: {
          ...s.error,
          'duration': ok
        }
      }));

      return !ok;
    } else if (!name.startsWith(ingredientsName)) {
      const ok = value.trim().length === 0;

      this.setState(s => ({
        error: {
          ...s.error,
          [name]: ok
        }
      }));

      return !ok;
    } else {
      const ok = value.trim().length === 0;

      this.setState(s => {
        const ingredientsErrors = [...s.error.ingredients];
        ingredientsErrors[name.substring(ingredientsName.length)] = ok;

        return {
          error: {
            ...s.error,
            'ingredients': ingredientsErrors
          }
        }
      });

      return !ok;
    }
  }

  addIngredient() {
    this.setState(s => ({
      ingredients: [...s.ingredients, ''],
      error: {
        ...s.error,
        ingredients: [...s.error.ingredients, false]
      }
    }))
  }

  submit() {
    if (this.props.loading)
      return;

    const {name, description, ingredients, duration, info, error} = this.state;
    const ingredientsName = 'ingredients-';

    // Validate fields
    const formInvalid = Object.keys(error).map(k => {
      if (k !== 'ingredients')
        return this.validate(k, this.state[k]);
      return this.state['ingredients']
        .map((_, i) => this.validate(`${ingredientsName}${i}`, this.state['ingredients'][i]))
        .some(x => x);
    }).some(x => !x);

    if (formInvalid)
      return;

    this.props.postRecipeNew(name, description, ingredients, duration, info);
  }

  render() {
    const createRecipeButton = (
      <span className='bar__item__label bar__item__label--bold' onClick={this.submit}>Přidat</span>
    );

    if (this.props.error === false)
      return <Redirect to='/' />

    return (
      <>
        <TitleBar title='Přidat recept' type='white' showBack={true} right={createRecipeButton} />
        <form className='create' autoComplete='off'>
          {
            this.props.error && <span className='create__error'>{this.props.error}</span>
          }
          <span className='create__title'>Název receptu</span>
          <div className={classNames({
            'create__wrapper': true,
            'create__wrapper--error': this.state.error['name'],
          })}>
            <input className='create__wrapper__input create__wrapper__input--text'
                   type='text' name='name' onChange={this.change} value={this.state.name} required />
          </div>
          <span className='create__title'>Úvodní text</span>
          <div className={classNames({
            'create__wrapper': true,
            'create__wrapper--error': this.state.error['info'],
          })}>
            <textarea className='create__wrapper__input create__wrapper__input--textarea'
                      name='info' onChange={this.change} value={this.state.info} required />
          </div>
          <span className='create__title'>Ingredience</span>
          {
            this.state.ingredients.map((x, i) => (
              <div className={classNames({
                'create__wrapper': true,
                'create__wrapper--error': this.state.error.ingredients[i],
              })} key={i}>
                <input className='create__wrapper__input create__wrapper__input--text'
                       type='text' placeholder='Ingredience' name={`ingredients-${i}`} onChange={this.change} value={x} required />
              </div>
            ))
          }
          <button className='create__add' type='button' onClick={this.addIngredient}>
            <IonAdd className='create__add__icon' />
            <span className='create__add__text'>Přidat</span>
          </button>
          <span className='create__title'>Postup</span>
          <div className={classNames({
            'create__wrapper': true,
            'create__wrapper--error': this.state.error['description'],
          })}>
            <textarea className='create__wrapper__input create__wrapper__input--textarea'
                      name='description' onChange={this.change} value={this.state.description} required />
          </div>
          <div className={classNames({
            'create__wrapper': true,
            'create__wrapper--error': this.state.error['duration'],
          })}>
            <span className='create__wrapper__label create__wrapper__label--left'>Čas</span>
            <input className='create__wrapper__input create__wrapper__input--time'
                   type='text' placeholder='60' name='duration' pattern='[1-9][0-9]*'
                   onChange={this.change} value={this.state.duration ? this.state.duration : ''} required />
            <span className='create__wrapper__label create__wrapper__label--right'>min.</span>
          </div>
        </form>
      </>
    );
  }
}

RecipeCreate.propTypes = {
  postRecipeNew: PropTypes.func.isRequired,
  createRecipeClear: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.bool.isRequired]).isRequired
};

const mapStateToProps = (state) => ({
  loading: state.ui.loading,
  error: state.ui.createError
});


export default connect(
  mapStateToProps,
  {postRecipeNew, createRecipeClear}
)(RecipeCreate);

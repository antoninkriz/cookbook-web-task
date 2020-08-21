import React from "react";

const RecipeSkeleton = () => {
  return (
    <span className='recipes__item'>
      <article className='recipes__item__wrapper recipes__item__wrapper--skeleton'>
        <div className='recipes__item__wrapper__image recipes__item__wrapper__image--skeleton' />
        <div className='recipes__item__wrapper__content recipes__item__wrapper__content--skeleton'>
          <div className='recipes__item__wrapper__content__title recipes__item__wrapper__content__title--skeleton'/>
          <div className='recipes__item__wrapper__content__stars recipes__item__wrapper__content__stars--skeleton' />
          <div className='recipes__item__wrapper__content__time recipes__item__wrapper__content__time--skeleton'>
            <div className='recipes__item__wrapper__content__time__icon recipes__item__wrapper__content__time__icon--skeleton' />
            <div className='recipes__item__wrapper__content__time__label recipes__item__wrapper__content__time__label--skeleton' />
          </div>
        </div>
      </article>
    </span>
  )
}

export default RecipeSkeleton;

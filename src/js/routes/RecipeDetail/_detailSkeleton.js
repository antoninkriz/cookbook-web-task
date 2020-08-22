import React from 'react';

const DetailSkeleton = () => (
  <div className='detail detail--skeleton'>
    <div className='detail__image detail__image--skeleton' />
    <div className='detail__content detail__content--skeleton'>
      <div className='detail__content__title detail__content__title--skeleton' />
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

export default DetailSkeleton;

import React from 'react';

export default (props) => {
  return (
    <svg
      viewBox='0 0 512 512'
      fill='currentColor'
      height='1em'
      width='1em'
      {...props}
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth={32}
        d='M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z'
      />
    </svg>
  );
}

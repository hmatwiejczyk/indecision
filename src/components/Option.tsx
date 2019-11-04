import * as React from 'react';

export const Option = props => (
  <li>
    {props.optionText}{' '}
    <button
      onClick={() => {
        props.removeOptionHandler(props.optionText);
      }}
    >
      X
    </button>
  </li>
);

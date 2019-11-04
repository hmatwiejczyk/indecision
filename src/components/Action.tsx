import * as React from 'react';

export const Action = props => (
  <div>
    <button disabled={!props.hasOptions} onClick={props.pickOptionHandler}>
      What should I do?
    </button>
  </div>
);

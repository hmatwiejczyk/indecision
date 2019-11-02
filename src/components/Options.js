import React from 'react';
import { Option } from "./Option";

export const Options = props => {
  return (
    <div>
      {props.options.length === 0 && <p>no data</p>}
      <ol>
        {props.options.map((o, i) => {
          return (
            <Option
              removeOptionHandler={props.removeOptionHandler}
              key={i}
              optionText={o}
            />
          );
        })}
      </ol>
      <button onClick={props.deleteOptionsHandler}>Remove All</button>
    </div>
  );
};

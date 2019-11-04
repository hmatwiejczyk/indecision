import * as React from 'react';
import * as Modal from 'react-modal';

Modal.setAppElement('#app');

export const OptionModal = props => (
  <Modal
    isOpen={!!props.selectedOption}
    onRequestClose={props.optionClearHandler}
    contentLabel="selected option"
  >
    <h3>selected option</h3>
    {props.selectedOption && <p>{props.selectedOption}</p>}
    <button onClick={props.optionClearHandler}>Okay</button>
  </Modal>
);

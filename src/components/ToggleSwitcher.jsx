/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import '../styles/toggleSwitch.scss';

function ToggleSwitcher(props) {
  const {
    leftValue, rightValue, onPeriodClick, onPopulationClick,
  } = props;
  return (
    <div className="content">
      { leftValue }
      <label className="switch">
        <input
          type="checkbox"
          onClick={(e) => {
            if (e.target.parentNode.previousSibling.length < 12) {
              onPeriodClick();
            } else {
              onPopulationClick();
            }
          }}
        />
        <span className="slider round" />
      </label>
      { rightValue }
    </div>
  );
}

export default ToggleSwitcher;

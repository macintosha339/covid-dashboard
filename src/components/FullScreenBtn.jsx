import React from 'react';
import '../styles/FullScreenBtn.scss';

function RequestFullScreen(event) {
  if (event.target.webkitRequestFullscreen) {
    event.target.parentNode.webkitRequestFullscreen();
  } else {
    event.target.parentNode.mozRequestFullScreen();
  }
  if (document.documentElement.webkitRequestFullscreen) {
    document.webkitCancelFullScreen();
  } else {
    document.mozCancelFullScreen();
  }
}

function FullScreenBtn() {
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button type="button" className="btn_full" onClick={(e) => RequestFullScreen(e)} />
  );
}

export default FullScreenBtn;

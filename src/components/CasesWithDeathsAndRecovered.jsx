import React from 'react';
import FullScreenBtn from './FullScreenBtn';

function CasesWithDeathsAndRecovered() {
  return (
    <div className="deaths_with_recovered main_component">
      <div>Cases: </div>
      <div>Deaths: </div>
      <div>Recoveries: </div>
      <FullScreenBtn />
    </div>
  );
}

export default CasesWithDeathsAndRecovered;

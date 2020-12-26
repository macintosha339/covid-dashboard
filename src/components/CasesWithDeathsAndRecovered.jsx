import React, { useState, useEffect } from 'react';
import FullScreenBtn from './FullScreenBtn';
import ToggleSwitcher from './ToggleSwitcher';

function CasesWithDeathsAndRecovered(props) {
  const {
    currentCountry, currentPeriod, currentPopulation, onPeriodClick, onPopulationClick
  } = props;
  const [data, setData] = useState('global');

  useEffect(() => {
    const fetchData = async () => {
      let result = await fetch('https://disease.sh/v3/covid-19/all');
      result = await result.json();
      setData(result);
    };
    fetchData();
  }, []);
  return (
    <div className="deaths_with_recovered main_component">
      <div>{currentCountry}</div>
      <div>
        Cases:
        {data.cases}
      </div>
      <div>
        Deaths:
        {data.deaths}
      </div>
      <div className="recoveries">
        Recoveries:
        {data.recovered}
      </div>
      <div className="line" />
      <FullScreenBtn />
      <ToggleSwitcher leftValue="All period" rightValue="Today" />
      <ToggleSwitcher leftValue="All population" rightValue="100k" />
    </div>
  );
}

export default CasesWithDeathsAndRecovered;

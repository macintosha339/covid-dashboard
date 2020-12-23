import React, { useState, useEffect } from 'react';
import FullScreenBtn from './FullScreenBtn';

function GlobalCases() {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let result = await fetch('https://disease.sh/v3/covid-19/all');
      result = await result.json();
      setData(result);
    };
    fetchData();
  }, [data]);
  return (
    <div className="global_cases main_component">
      <div className="title_global">Global Cases</div>
      <div className="cases">{data.cases}</div>
      <FullScreenBtn />
    </div>
  );
}

export default GlobalCases;

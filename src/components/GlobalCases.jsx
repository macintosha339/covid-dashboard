import React, { useState, useEffect } from 'react';
import FullScreenBtn from './FullScreenBtn';
import CovidService from './ServiceComponent';

function GlobalCases() {
  const service = new CovidService();
  const [data, setData] = useState('');

  useEffect(() => {
    service
      .getAllCases()
      .then((response) => {
        setData(response.Global.TotalConfirmed);
      });
  }, []);

  return (
    <div className="global_cases main_component">
      <div className="title_global">Global Cases</div>
      <div className="cases">
        {data}
      </div>
      <FullScreenBtn />
    </div>
  );
}

export default GlobalCases;

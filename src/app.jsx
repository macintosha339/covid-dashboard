/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import GlobalCases from './components/GlobalCases';
import Map from './components/Map';
import CasesWithDeathsAndRecovered from './components/CasesWithDeathsAndRecovered';
import ListOfCountries from './components/ListOfCountries';
import Chart from './components/Chart';
import CovidService from './components/ServiceComponent';
import covidStatState from './components/InitialStateComponent';

function App() {
  const [state, setState] = useState({});
  const [countriesStat, setCountriesStat] = useState([]);
  const [globalStat, setGlobalStat] = useState([]);
  useEffect(() => {
    let isMounted = false;
    covidStatState()
      .then((res) => {
        if (!isMounted) {
          setState(res);
          setCountriesStat(res.countriesStat);
          setGlobalStat(res.globalStat);
        }
      });
    return () => {
      isMounted = true;
    };
  }, []);

  const data = [];
  let visits = 10;
  for (let i = 1; i < 366; i++) {
    visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
    data.push({ date: new Date(2019, 0, i), value: visits });
  }

  return (
    <div className="wrapper">
      <Header />
      <GlobalCases />
      <Map />
      <CasesWithDeathsAndRecovered />
      <ListOfCountries countries={countriesStat} />
      <Chart data={data} />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

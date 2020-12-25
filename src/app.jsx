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
  const [currentCountry, setCurrentCountry] = useState('Global');

  const [currentPeriod, setCurrentPeriod] = useState('All period');
  const setPeriod = () => {
    if (currentPeriod === 'All period') {
      setCurrentPeriod('Today');
    } else {
      setCurrentPeriod('All period');
    }
  };
  useEffect(() => {
    console.log(currentPeriod);
  }, [currentPeriod]);

  const [currentPopulation, setCurrentPopulation] = useState('All population');
  const setPopulation = () => {
    if (currentPopulation === 'All population') {
      setCurrentPopulation('100k');
    } else {
      setCurrentPeriod('All population');
    }
  };
  useEffect(() => {
    console.log(currentPopulation);
  }, [currentPopulation]);

  const [currentRate, setCurrentRate] = useState('Cases');


  let data = [];
  let visits = 10;
  for (let i = 1; i < 366; i++) {
    visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
    data.push({ date: new Date(2019, 0, i), value: visits });
  }

  return (
    <div className="wrapper">
      <Header />
      <GlobalCases currentCountry={currentCountry} currentPeriod={currentPeriod} />
      <Map />
      <CasesWithDeathsAndRecovered currentCountry={currentCountry} currentPeriod={currentPeriod} currentPopulation={currentPopulation} onPeriodClick={setPeriod} onPopulationClick={setPopulation} />
      <ListOfCountries />
      <Chart data={data} />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

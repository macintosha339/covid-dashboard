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
import { covidStatState } from './components/InitialStateComponent';

function App() {
  const [state, setState] = useState(null);
  const [countriesStat, setCountriesStat] = useState([]);
  const [globalStat, setGlobalStat] = useState([]);
  const [countryHistoryStat, setCountryHistoryStat] = useState([1, 1]);
  const [globalHistoryStat, setGlobalHistoryStat] = useState([]);
  const [value, setValue] = useState('Total confirmed');
  const [activeCountry, setActiveCountry] = useState(null);
  useEffect(() => {
    let isMounted = false;
    covidStatState()
      .then((res) => {
        if (!isMounted) {
          setState(res);
          setCountriesStat(res.countriesStat);
          setGlobalStat(res.globalStat);
          setGlobalStat(res.globalStat);
          setGlobalStat(res.globalStat);
          setGlobalHistoryStat(res.historyData);
        }
      });
    return () => {
      isMounted = true;
    };
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <GlobalCases />
      <Map countries={countriesStat} stat={value} />
      <CasesWithDeathsAndRecovered
        global={global}
        stat={value}
        activeCountry={activeCountry}
        countries={countriesStat}
      />
      <ListOfCountries countries={countriesStat} stat={value} activeCountry={activeCountry} setActiveCountry={setActiveCountry} setCountryHistoryStat={setGlobalHistoryStat} />
      <Chart
        stat={value}
        activeCountry={activeCountry}
        globalHistory={globalHistoryStat}
        countryHistoryStat={countryHistoryStat}
      />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

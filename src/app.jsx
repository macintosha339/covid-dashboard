import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import GlobalCases from './components/GlobalCases';
import Map from './components/Map';
import CasesWithDeathsAndRecovered from './components/CasesWithDeathsAndRecovered';
import ListOfCountries from './components/ListOfCountries';
import Chart from './components/Chart';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <GlobalCases />
      <Map />
      <CasesWithDeathsAndRecovered />
      <ListOfCountries />
      <Chart />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

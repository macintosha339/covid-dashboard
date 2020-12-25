import React from 'react';
import FullScreenBtn from './FullScreenBtn';
import '../styles/ListOfCountries.scss';

function ListOfCountries({ countries }) {
  const countriesList = countries.map((item) => {
    const state = {
      id: item.id,
      countryTotalCases: item.TotalConfirmed,
      countryName: item.country,
      ...item,
    };

    return (
      <li key={state.id} className="cases-wrapper">
        <div className="country-flag-wrapper"><img src={state.flag} alt="flag" className="country-flag" /></div>
        <span className="country-wrapper">{state.countryName}</span>
        <span className="country-stat-wrapper">{state.countryTotalCases}</span>
      </li>
    );
  });
  return (
    <div className="list_countries main_component">
      List of countries
      <ul className="lists-wrapper">
        {countriesList}
      </ul>
      <FullScreenBtn />
    </div>
  );
}

export default ListOfCountries;

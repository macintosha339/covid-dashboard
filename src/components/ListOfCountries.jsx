import React, { useEffect, useState } from 'react';
import FullScreenBtn from './FullScreenBtn';
import '../styles/ListOfCountries.scss';
import Search from './Search';
import { getHistoryStatCounry } from './InitialStateComponent';

const ListOfCountries = ({
  countries, stat, activeCountry, setActiveCountry, setCountryHistoryStat,
}) => {
  const [temp, setTemp] = useState('');

  async function setCountry(e) {
    const selectedCountyCode = e.target.closest('.cases-wrapper').dataset.selectedCountry;
    setActiveCountry(selectedCountyCode);

    const historyData = await getHistoryStatCountry(selectedCountyCode, countries);
    setCountryHistoryStat(historyData);
  }

  function changeHighlightSelectedCountry(activeCountry) {
    if (document.querySelector('.active-country')) {
      document.querySelector('.active-country').classList.toggle('active-country');
    }
    if (document.querySelector(`.cases-wrapper[data-selected-country='${activeCountry}']`)) {
      document.querySelector(`.cases-wrapper[data-selected-country='${activeCountry}']`).classList.toggle('active-country');
    }
  }

  changeHighlightSelectedCountry(activeCountry);

  function onSearch(temp) {
    setTemp(temp);
  }

  const visibleItems = (function search(countries, temp) {
    if (temp.length === 0) {
      return countries;
    }

    return countries.filter((country) => country.Country
      .toLowerCase()
      .indexOf(temp.toLowerCase()) > -1);
  }(countries, temp));

  const countriesList = visibleItems.map((item) => {
    const state = {
      id: item.id,
      countryName: item.Country,
      ...item,
    };

    return (
      <li key={state.id} className="cases-wrapper" data-selected-country={state.CountryCode} onClick={setCountry}>
        <div className="country-flag-wrapper"><img src={state.flag} alt="flag" className="country-flag" /></div>
        <span className="country-wrapper">{state.countryName}</span>
        <span className="country-stat-wrapper">{item[stat]}</span>
      </li>
    );
  });

  countriesList.sort((a, b) => b.props.children[0].props.children - a.props.children[0].props.children);

  return (
    <div className="list_countries main_component">
      List of countries
      <Search onSearch={onSearch} />
      <ul className="lists-wrapper">
        {countriesList}
      </ul>
      <FullScreenBtn />
    </div>
  );
};

export default ListOfCountries;

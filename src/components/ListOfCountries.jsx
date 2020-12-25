import React, { useEffect, useState } from 'react';
import FullScreenBtn from './FullScreenBtn';
import '../styles/ListOfCountries.scss';
import Search from './Search';

const ListOfCountries = ({ countries, stat }) => {
  const [temp, setTemp] = useState('');
  const [statistic, setStatisctic] = useState(0);

  useEffect(() => {
    setStatisctic(stat);
  }, [stat]);

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

    let prop;
    if (statistic === 0) {
      prop = item.TotalConfirmed;
    } else if (statistic === 1) {
      prop = item.TotalRecovered;
    } else if (statistic === 2) {
      prop = item.TotalDeaths;
    } else if (statistic === 3) {
      prop = item.NewConfirmed;
    } else if (statistic === 4) {
      prop = item.NewRecovered;
    } else if (statistic === 5) {
      prop = item.NewDeaths;
    } else if (statistic === 6) {
      prop = item.GlobalCasesPer100Thousand;
    } else if (statistic === 7) {
      prop = item.GlobalRecoveredPer100Thousand;
    } else if (statistic === 8) {
      prop = item.GlobalDeathesPer100Thousand;
    } else if (statistic === 9) {
      prop = item.NewGlobalCasesPer100Thousand;
    } else if (statistic === 10) {
      prop = item.NewGlobalRecoveredPer100Thousand;
    } else if (statistic === 11) {
      prop = item.NewGlobalDeathsPer100Thousand;
    }

    return (
      <li key={state.id} className="cases-wrapper">
        <div className="country-flag-wrapper"><img src={state.flag} alt="flag" className="country-flag" /></div>
        <span className="country-wrapper">{state.countryName}</span>
        <span className="country-stat-wrapper">{prop}</span>
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

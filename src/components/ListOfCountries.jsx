import React, { useState, useEffect } from 'react';
import FullScreenBtn from './FullScreenBtn';

function ListOfCountries() {
  const [data, setData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      let result = await fetch('https://disease.sh/v3/covid-19/countries');
      result = await result.json();
      setData(result);
    };
    fetchData();
  }, []);
  const arr = [1, 2, 3];
  console.log(data[0]);
  return (
    <div className="list_countries main_component">
      List of countries
      {arr.map((el, index) => <li key={index}>{el}</li>)}
      <FullScreenBtn />
    </div>
  );
}

export default ListOfCountries;

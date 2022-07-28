import React from 'react';
import { useState, useEffect } from 'react';
import "./App.css";
import TooMany from './components/TooMany';
import Country from './components/Country';
import Countries from './components/Countries';
import Blank from './components/Blank';
import axios from 'axios';
// 

const App = () => {

  const [filterCountries, setFilterCountries] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
       .then(response => {
        setData(response.data);
    })}, [])

  const countriesToShow = data.filter((countries) => countries.name.common.toLowerCase().includes(filterCountries.toLowerCase()));
  const handleInput = (e) => {
    setFilterCountries(e.target.value);
  }

  const handleClick = (e) => {
    setFilterCountries(e.target.value);
  }

  const handleContent = () => {
    if(countriesToShow.length == 0)
    {
      return <Blank />;
    } else if(countriesToShow.length <= 10 && countriesToShow.length > 1)
    {
      return <Countries countries={countriesToShow} onClick={handleClick}/>
    } else if(countriesToShow.length > 10)
    {
      return <TooMany/>
    } else if (countriesToShow.length == 1)
    {
      return <Country place={filterCountries} country={countriesToShow}/>;
    }
  }
  
  return (
    <div>
      <h1>Countries</h1>
      <div className='filter'>
        find countries: <input value={filterCountries} onChange={handleInput}/>
      </div>
      <div className='left'>
        {handleContent()}
      </div>
    </div>
  )
}

export default App
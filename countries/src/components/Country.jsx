import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Country = (props) => {

    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        axios.get(`https://api.weatherapi.com/v1/current.json?key=21a992ffff52452080624218222307&q=${props.place}`)
           .then(response => {
            setWeatherData(response.data);      
        })}, [])

        let {location, current} = weatherData;

  return (
    <div>
        {props.country.map((data) => 
            <div>
                <div>
                    <h2 key={data.name.official} >{data.name.common}</h2>
                    <p key={data.capital} ><strong>{data.capital}</strong> is their capital</p>
                    <p key={data.area} ><strong>{data.area}km²</strong> is their area</p>
                </div>
                <div >
                    <p style={{marginTop: "25px"}}><strong>Official Languages:</strong></p>
                    <ul>
                        {Object.keys(data.languages).map(lang => <li key={lang}> {data.languages[lang]} </li>)}
                    </ul>
                </div>
                <div className='flag'>
                    <img src={data.flags.png} width="50%" key={data.flags.png}/>
                </div>
            </div>
        )}
        <div>
            <p style={{marginTop: "25px"}}>Weather in <strong> {location.name}</strong></p>
            <p>Temperature (°C): <strong>{current.temp_c}°C</strong></p>
            <p>Temperature (°F): <strong>{current.temp_f}°F</strong></p>
            <img src={current.condition.icon}/>
            <p>Wind : <strong>{current.wind_kph}km/s</strong></p>
        </div>
    </div>
  )
}

export default Country
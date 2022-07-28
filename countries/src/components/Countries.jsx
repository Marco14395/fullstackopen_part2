import React from 'react';

const Countries = (props) => {
  return (
    <div>
        {props.countries.map((countries) => 
        <div>
            <p key={countries.flags.svg} style={{display: "inline-block", marginRight: "5px", verticalAlign: "center"}}>{countries.name.common}</p>
            <button onClick={props.onClick} value={countries.name.common}>show</button>
        </div>
        )} 
    </div>
  )
}

export default Countries
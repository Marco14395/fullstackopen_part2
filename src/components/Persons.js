import React from "react";

const Persons = (props) => {
  return (
    <div>
      {props.person.map(man => 
        <div>
          <p key={props.key}>{man.name} {man.number}</p>
          <button onClick={props.onClick} value={man.id} id={man.name}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Persons;

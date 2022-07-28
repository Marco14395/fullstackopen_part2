import React from "react";

const Filter = (props) => {
  return (
    <div>
      <label htmlFor="filter">Filter: </label>
        <input id="filter" value={props.value} onChange={props.onChange} />
    </div>
  );
};

export default Filter;

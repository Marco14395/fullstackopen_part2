import React from 'react'

const PersonForm = (props) => {
  return (
    <div>
        <form onSubmit={props.onSubmit}>
        <div>
          Name: <input value={props.value1} onChange={props.onChange1} required/>
        </div>
          <br />  
        <div>
          Number: <input value={props.value2} onChange={props.onChange2} required/>
        </div>
        <br />  
        <div>
          <button type="submit">Add Person</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
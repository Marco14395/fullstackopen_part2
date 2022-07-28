import React from 'react'
import "./Notification.css"

const Notification = (props) => {
    if(props.message === null) 
    {
        return null
    }
  return (
    <div className='Message' style={props.style}>{props.message}</div>
  )
}

export default Notification
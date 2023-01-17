import React from 'react'

const Content = (props) => {
    return ( 
      
      <div>
        {props.parts.map((part) => (
          <div key={part.id}> {part.name} {part.exercises} </div>
        ))}
      </div>
      
    )
  }
export default Content
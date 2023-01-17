import React from 'react'

const Persons = ({personstoshow, deletePerson}) => {
  return (
    <div>{personstoshow.map(person =>
      <div key={person.id}>{person.name} {person.number} 
      <button value={person.id} onClick={deletePerson}>delete</button>
      </div>
      
    )}
    </div>
  )
}

export default Persons
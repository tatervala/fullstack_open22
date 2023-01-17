import React from 'react'

const PersonForm = ({addPerson,newName,handlenameChange,newNumber,handlenumberChange}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlenameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handlenumberChange}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
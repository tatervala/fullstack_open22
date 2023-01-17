import React, {useState,useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personservice'
import Notification from './components/Notification'

const App= () => {
  const [persons,setPersons] = useState([])
  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notiMessage, setnotiMessage] = useState(null)
  
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  },[])

  
  const addPerson = (event) => {
    event.preventDefault()
    if(typeof persons.find(person => person.name === newName) === 'undefined'){
    const nameObject = {
      name: newName,
      number: newNumber
    }

    personService
    .create(nameObject)
    .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
    }).then(i => {
      setnotiMessage(`Added ${newName} `)
      setTimeout(() => {
          setnotiMessage(null)
        }, 5000)
    }).catch(error => {
      console.log(error.response.data.error)
      setnotiMessage(`${error.response.data.error}`)
      setTimeout(() => {
        setnotiMessage(null)
      },5000)
    })

  }
  else {
    window.confirm(`${newName} is already added to the phonebook, replace it?`)
    const p = persons.find(person => person.name === newName)
    const newP = {...p,number:newNumber}
    personService.update(newP).then(responsedata => {
      setPersons(persons.map(person => person.id===responsedata.id?responsedata:person))
    }).then(i => {
      setnotiMessage(`Updated ${newName} `)
      setTimeout(() => {
          setnotiMessage(null)
        }, 5000)
    }).catch(error => {
      console.log(newName)
      setPersons(persons.filter(person => person.name !== newName))
      setnotiMessage(`Information of ${newName} was already deleted from the server`)
      setTimeout(() => {
        setnotiMessage(null)
      },5000)
      
    })
  }
  setNewName('')
  setNewNumber('')

  }
  const handleSearchChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handlenameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlenumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const personstoshow = persons.filter(person => person.name.includes(newFilter))
  
  const deletePerson = (event) => {
    event.preventDefault()
    const id = (event.target.value)
    console.log(event.target.value)
    const personname = persons.find(person => person.id === id)
    
    if(window.confirm(`Delete ${personname.name} ?`)){
      personService.del(id).then(response => {
          setPersons(persons.filter(person => person.id !== id))
      }).then(i => {
        setnotiMessage(`Deleted ${personname.name} `)
        setTimeout(() => {
            setnotiMessage(null)
          }, 5000)
      }).catch(error => {
        console.log(personname.name)
        setPersons(persons.filter(person => person.name !== personname.name))
        setnotiMessage(`Information of ${personname.name} was already deleted from the server`)
        setTimeout(() => {
          setnotiMessage(null)
        },5000)
        
      })
    }

  }
  return (

      <div>
      <h2>Phonebook</h2>
      <Notification message={notiMessage} />
      <Filter title="filter shown with"
      name={newFilter} handleFunction={handleSearchChange} />
      <h2>Add a New</h2>
      <PersonForm addPerson={addPerson} newName={newName}
      handlenameChange={handlenameChange} newNumber={newNumber}
      handlenumberChange={handlenumberChange} />
      <h2>Numbers</h2>
      <Persons personstoshow={personstoshow} deletePerson={deletePerson} />
      </div>
  )
}

export default App;
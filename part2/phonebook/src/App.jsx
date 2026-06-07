import { useState, useEffect } from 'react'
import axios from 'axios'
import services from './services/phonebookServices'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Communicating with backend server from db.json
  // Used to get the backend dat
  useEffect(() => {
    console.log('effect')
    services
      .getAll()
      .then(initialData => {
        console.log('promise fulfilled')
        setPersons(initialData)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      services
        .remove(id)
        .then(() => {
          // Update the UI state by filtering out the deleted person
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`The contact '${name}' was already deleted from the server.`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>==========</div>
      <Filter  filter={filter} setFilter={setFilter}/>
      <div>debug: {newName}</div>


      <PersonForm 
        persons={persons} 
        setPersons={setPersons} 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber} 
      /> 

      <h2>Numbers</h2>

      <Persons persons={personsToShow} deletePerson={deletePerson}/>

    </div>
  )
}

export default App
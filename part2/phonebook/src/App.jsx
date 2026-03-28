import { useState, useEffect } from "react";
import personServices from "./services/personServices"
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notifications";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [notif, setNotif] = useState(null);
  const [errorMes, setErrorMes] = useState(null);

  // Fetching data from the server
  useEffect(() => {
    console.log('effect')
    personServices
      .getAll()
      .then(response => { 
        console.log('promise fullfilled')
        setPersons(response)
      })
  }, [])
  console.log('rendering', persons.length, 'lists')
  console.log(persons)

  // Deleting notes in the server
  const handleDelete = (id) => {
    const toDelete = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${toDelete.name}?`)){
      personServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotif(`Contact Deleted`)
          setTimeout(() => {
            setNotif(null)
          }, 5000);
        })
        .catch(error => {
          setErrorMes(
            `Information of ${toDelete.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMes(null)
          }, 3000)
        })   
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch}/>
      <Notification notif={notif}/>
      <ErrorMessage errorMes={errorMes}/>
      <PersonForm persons={persons} setPersons={setPersons} newPerson={newPerson} setNewPerson={setNewPerson} newNumber={newNumber} setNewNumber={setNewNumber} setNotif={setNotif} setErrorMes={setErrorMes} />
      <h2>Numbers</h2>
      <Persons key={persons.id} persons={persons} search={search}/>
      <h2>Delete</h2>
      <div>
        {persons.map(person => (
          <div key={person.id}>
            <li key={person.id}>{person.name} {person.number}
              <button style={{marginLeft: '40px'}} onClick={() => handleDelete(person.id)}>Delete</button>
            </li>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;

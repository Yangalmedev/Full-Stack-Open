/* From the App file, we innitialized the PersonForm with 
{persons, setPersons, newName, setNewName, newNumber, setNewNumber} 
argument because we needed those in this file, then we put the parameters here  */


const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {

  const addPerson = (event) => {
    event.preventDefault()

    const nameExist = persons.some(person => person.name.toLowerCase() === newName.trim().toLowerCase())
    if(nameExist){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    const personObj = { name: newName , number: newNumber}

    setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <button type="submit">ADD</button>
    </form>
  )

}

export default PersonForm;
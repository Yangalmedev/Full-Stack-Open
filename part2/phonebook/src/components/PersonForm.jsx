import personServices from "../services/personServices";

const PersonForm = ({persons, setPersons, newPerson, setNewPerson, newNumber, setNewNumber, setNotif, setErrorMes}) => {

  // Adding new contact/person
  const handleFormSubmit = (event) => {
    event.preventDefault()
    const name = {
      name: newPerson,
      number: newNumber
    }

    const isNameEmpty = !name?.name?.trim();
    const isNumberEmpty = !name?.number?.trim();
    const trimmedName = newPerson.trim();
    const trimmedNumber = newNumber.trim();

    const info = { 
      name: trimmedName, 
      number: trimmedNumber
    }

    if(isNameEmpty && isNumberEmpty){
      alert('Empty form. No data to add.')
    }else if(isNameEmpty){
      alert('Please enter name')
    }else if(isNumberEmpty){
      alert('Please enter number')
    }else{
      if(persons.some(person => person.name === trimmedName)){

        const existingPerson = persons.find(p => p.name === trimmedName)
        const updated = { ...existingPerson, number: trimmedNumber}

        if(!window.confirm(`${trimmedName} is already added to phonebook, replace the old number with a new one?`)){
          
          return;
        }
        personServices
          .update(existingPerson.id, updated)
          .then(response => {
            setPersons(persons.map(person => person.id === existingPerson.id ? response : person))
            setNewPerson('')
            setNewNumber('')

            setNotif(`Succesfully updated number for ${existingPerson.name}`)
            setTimeout(() => {
              setNotif(null)
            }, 5000);
          })
          .catch(error => {
            setErrorMes(
              `Information of ${existingPerson.name} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMes(null)
            }, 3000)
            console.error('Failed to update resource', error)
          })
        
      }else{
        personServices
          .create( name )
          .then(response => {
            setPersons(persons.concat(response))
            setNewPerson('')
            setNewNumber('')
            setNotif(`Added ${info.name}`)
            setTimeout(() => {
              setNotif(null)
            }, 3000)
          })
      }
    }

  }

  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input onChange={(event) => setNewPerson(event.target.value)} value={newPerson}/>
        </div>
        <div>
          number: <input onChange={(event) => setNewNumber(event.target.value)} value={newNumber}/>
        </div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}


export default PersonForm;
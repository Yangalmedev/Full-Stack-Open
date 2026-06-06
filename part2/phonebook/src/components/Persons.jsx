

/* From the App file, we innitialized the Persons with {persons} argument, the we put the parameter here*/
const Persons = ({persons}) => {

  return(
    <ul>
      {persons.map((person, index) => (
        <li key={index}>{person.name} {person.number}</li>
      ))}
    </ul>
  )
}

export default Persons;
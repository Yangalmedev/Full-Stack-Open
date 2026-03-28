const Persons = ({persons, search}) => {
  const filteredList = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));

  return (
    filteredList.map(list => <p key={list.id}>{list.name} {list.number}</p>)
  )
}

export default Persons;


const Filter = ({search, setSearch}) => {
  return(
    <div>
      <div>
        search: <input type="text" onChange={(event) => setSearch(event.target.value)} value={search}/>
      </div>
    </div>
  )
}

export default Filter;
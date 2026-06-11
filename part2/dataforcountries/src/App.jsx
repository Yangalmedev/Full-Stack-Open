
import axios from "axios";
import { useState, useEffect } from "react";
import Country from "./components/Country";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]); 
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(intlCountries => {
        setAllCountries(intlCountries.data);     
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setCountries([]);
      return;
    }
    const filteredCountries = allCountries.filter(c => 
      c.name?.common?.toLowerCase().includes(search.toLowerCase())
    );
    setCountries(filteredCountries);
  }, [search, allCountries]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      find country: <input onChange={handleSearchChange} value={search} />

      <div className="country">
        {countries.length === 1 && <Country country={countries[0]} />}

        {countries.length > 10 && (
          <p>Too many matches, specify the country you want to search!</p>
        )}

        {countries.length > 1 && countries.length <= 10 && (
          countries.map((country, i) => (
          <li key={country.cca3 || i}>
            {country?.name?.common}
          </li>
          ))
        )}
        
      </div>  
    </div>
  );
};

export default App;

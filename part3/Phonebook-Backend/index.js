const { log, error } = require('console')
const express = require('express')
const app = express()
app.use(express.json())

log('Hello, World')

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

// Display all resources
app.get('/api/persons', (req, res) => {
  res.json(persons)
});

// Counting the numbers of resources
app.get('/info', (req, res) => {
  const info = persons.length
  const reqDate = new Date();
  res.send(
    `<p>Phonebook has info for ${info} people</p>
    <p> ${reqDate.toString()} </p>`
  )
});

// Display for single entry of resource
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find((p) => p.id === id)
  
  if(person){
    res.json(person)
  }else {
    res.status(404).end()
  }
});


app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find((p) => p.id === id);

  if (person) {
    persons = persons.filter((p) => p.id !== id);
    res.status(204).end(); 
    console.log(`${person.name} successfully deleted!`); 

  } else {
    res.status(404).json({ error: 'Person not found' });
  }
});



// Server Port
const PORT = 3001
app.listen(PORT, () => {
  log(`Server running on port ${PORT}`)
});

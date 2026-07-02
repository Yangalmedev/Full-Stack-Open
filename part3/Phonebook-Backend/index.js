require('dotenv').config()
const { log, error } = require('console')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const Person = require('./models/persons')
const app = express()

app.use(express.static('dist'))  
app.use(express.json())

// Define a custom token to capture POST body data
morgan.token('body', (req, res) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

// Use the tiny configuration and append the custom body token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

log('Hello, World')

// Display all resources. the 'people' used here is the generated name in MongoDB Atlas
app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
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

// Adding new person
app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'name or number is missing' 
    });
  }
  const nameExists = persons.some(p => p.name.toLowerCase() === body.name.toLowerCase());
  if (nameExists) {
    return res.status(400).json({ 
      error: 'name must be unique' 
    });
  }

  const largeRandomId = String(Math.floor(Math.random() * 10000000) + 1);
  const newPerson = {
    id: largeRandomId,
    name: body.name,
    number: body.number
  };
  persons = persons.concat(newPerson);
  log(`New person added to Phonebook ${JSON.stringify(newPerson)}`)

  res.status(201).json(newPerson);
});


// Deleting resources
app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(request.params.id)
    .then(person => {
      res.status(204).end(); 
    })
    .catch(error => {
      res.status(404).json({ error: 'Person not found' });
    })
});


// Server Port reads from .env
const PORT = process.env.PORT
app.listen(PORT, () => {
  log(`Server running on port ${PORT}`)
});

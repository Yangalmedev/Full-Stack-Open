const mongoose = require('mongoose')

// Guard: password is required
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://Yangalmedev:${password}@cluster1.vk6kmfc.mongodb.net/?appName=Cluster1`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)
// ↑ Mongoose will auto-name the collection 'people' (not 'persons')

// If only password is given → show all entries
if (!name && !number) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close() // ← correct place, INSIDE .then()
  })

// If name and number are given → add new entry
} else if (name && number) {
  const person = new Person({ name, number })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close() // ← correct place, INSIDE .then()
  })

// If only one of name/number is given → warn the user  
} else {
  console.log('provide both name and number')
  mongoose.connection.close()
}
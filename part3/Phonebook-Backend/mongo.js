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
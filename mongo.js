const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url = 'mongodb://root:password123@ds137661.mlab.com:37661/fullstack2018_puhelinluettelo'
mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv[2] === undefined){
   Person
  .find({})
  .then(result => {
       console.log('puhelinluettelo:')
      result.forEach(person => {
      console.log(person.name,person.number)
    })
    mongoose.connection.close()
  })
} else {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })    
    person
    .save()
    .then(response => {
        console.log('lisätään henkilö',process.argv[2],'numero',process.argv[3],'luetteloon')
        mongoose.connection.close()
    })
}


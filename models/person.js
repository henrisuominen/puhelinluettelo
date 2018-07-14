const mongoose = require('mongoose')

const url = 'mongodb://root:password123@ds137661.mlab.com:37661/fullstack2018_puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

Person.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

module.exports = Person
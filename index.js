const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }
  ]

app.get('/info', (req, res) => {
    const info = "<p>puhelinluettelossa ".concat(persons.length).concat(" henkilön tiedot</p><p>").concat(new Date()).concat("</p>")
  res.send(info)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
  //response.end(JSON.stringify(notes))
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: 'name must be unique'})
    }
    
    const names = persons.map(person => person.name)
    
    if (names.includes(body.name)) {
        return response.status(400).json({ error: 'name must be unique'})
    }
        
    const id = Math.floor(Math.random()*1000)
    
    const person = {
        name: body.name,
        number: body.number,
        id: id
    }
    
    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
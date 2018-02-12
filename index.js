const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
morgan.token('type', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :type :status :res[content-length] - :response-time ms'))



{
let persons = [
    {
      id: 1,
      name: 'Arto Hellas',
      number: '040-123456'
      
    },
    {
      id: 2,
      name: 'Martti Tienari',
      number: '040-123456'
      
    },
    {
      id: 3,
      name: 'Arto Järvinen',
      number: '040-123456'
      
    },
    {
      id: 4,
      name: 'Lea Kutvonen',
      number: '040-123456'
      
    }
  ]

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/info', (request, response) => {
    response.send(`puhelinluettelossa on  ${persons.length} henkilön tiedot <br> <br> ${new Date()}`)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id )
    if ( person ) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  const generateId = () => {
    return Math.floor(Math.random() * 9999999)
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.name === undefined) {
      return response.status(400).json({ error: 'name missing' })
    }

    if (body.number === undefined) {
      return response.status(400).json({ error: 'number missing' })
    }

    if (persons.find(person => person.name === body.name)){
      return response.status(400).json({ error : 'name already exists'})
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  const error = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
  }
  
  app.use(error)
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}


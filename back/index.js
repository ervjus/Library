const express = require('express')
const app = express()
const cors = require('cors')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)


let books = [
    {
        title: "Tuomion miekka",
        author: "Teemu Turunen",
        description: "Sankarillisia tarinoita",
        id: 1
      },
      {
        title: "Luvattu maa",
        author: "Noora Kivimäki",
        description: "Lupauksia maasta",
        id: 2
      },
      {
        title: "Tatu ja Patu",
        author: "Kovaa menoa kiskoilla",
        description: "Kirjassa Tatulla ja patulla on kovaa menoa kiskoilla",
        id: 3
      },
      {
        title: "Pizze",
        author: "Saku Tuominen",
        description: "Pizzojen paistamiseen vinkkejä",
        id: 4
      }
]


  app.get('/api/books', (req, res) => {
    res.json(books)
  })

  app.get('/api/books/:id', (request, response) => {
    const id = Number(request.params.id)
    const book = books.find(book => book.id === id)
    
    if (book) {
      response.json(book)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/books/:id', (request, response) => {
    const id = Number(request.params.id)
    books = books.filter(book => book.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = books.length > 0
      ? Math.max(...books.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/books', (request, response) => {
    const body = request.body
  
    const book = {
      title: body.title,
      author: body.author,
      description: body.description,
      id: generateId(),

    }
  
    books = books.concat(book)
  
    response.json(book)
  })

  app.put('/api/books/:id', (request, response) => {
    const book = books.find(g => g.id === parseInt(request.params.id));

    book.author = request.body.author;
    book.title = request.body.title;
    book.description = request.body.description;
    response.send(book);
  })

  app.use(unknownEndpoint)

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
import { React , useState, useEffect }  from 'react'
import bookService from '../services/books'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container, Row, Col,  FormGroup,
  Input, Form, Button,
} from "reactstrap"

  
function BookList() {
  const [books, setBooks] = useState([])
  const [selected, setSelected] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newDescription, setNewDescription] = useState('')

  useEffect(() => {
    bookService
    .getAll()
    .then(initialBooks => {
      setBooks(initialBooks)
    })
  },);


  const addBook = event => {
    event.preventDefault()
    const bookObject = {
        title: newTitle,
        author:newAuthor,
        description: newDescription,
    }
  
      bookService
      .create(bookObject)
      .then(returnedBook => {
        setBooks(books.concat(returnedBook))
      })
      setSelected('')
      setNewTitle('')
      setNewAuthor('')
      setNewDescription('')
      
  }

  const updateBook =  id => {
    const changedBook = { 
    title: newTitle,
    author:newAuthor,
    description: newDescription,
    }
        bookService
        .update(id, changedBook)
        .then(returnedBook => {
          setBooks(books.map(book => book.id !== id ? book : returnedBook))
      })
  }


  const removeBook = id => { 
        bookService
        .remove(id)
        setBooks(books.filter(books => books.id !== id))
      setSelected('')
      setNewTitle('')
      setNewAuthor('')
      setNewDescription('')
   };

const emptyForm = () => { 
  setSelected('')
  setNewTitle('')
  setNewAuthor('')
  setNewDescription('')
};

  const onChangeTitle = (event) => {
    setNewTitle(event.target.value)
  }
  const onChangeAuthor = (event) => {
    setNewAuthor(event.target.value)
  }
  const onChangeDescription = (event) => {
    setNewDescription(event.target.value)
  }
  const onChangeSelected = (event) => {
    setSelected(event.target.value)
    
    for (let i = 0; i < books.length; i++) {
    let matchId = String(books[i].id)
    if(event.target.value === matchId) {
    setNewAuthor(books[i].author)
    setNewDescription(books[i].description)
    setNewTitle(books[i].title)
  }
}
  }

    return (
        <div style={{
            display: 'block', width: 900, padding: 30
        }}>
            <Container>
                <Row>
                  <Col md="7">
                    <Form>
                    <FormGroup>
                      <label className="mb-2">
                       Title
                      </label>
                      <Input
                        name="newTitle"
                        type="text"
                        value={newTitle}
                        onChange={onChangeTitle}
                      />
                    </FormGroup>
                    </Form>
                  </Col>
                  <Col md="5">
                          <FormGroup>
                          <label className="mb-2">
                              Books
                            </label>
                            <Input
                              type="select"
                              name="selected"
                              onChange={onChangeSelected}
                              value={selected}
                              
                            >
                              <option value="" disabled selected>Select book..</option>
                               {books.map(book => 
          <option value={book.id} key={book.id}>{book.title} / {book.author}</option>
        )}
                            </Input>
                          </FormGroup>
                        </Col>
                        <p>{books.Author}</p>
                  </Row>
                  <Row>
                  <Col md="7">
                    <Form>
                    <FormGroup>
                      <label className="mb-2">
                       Author
                      </label>
                      <Input
                         name="newAuthor"
                         type="text"
                         value={newAuthor}
                         onChange={onChangeAuthor}
                      />
                    </FormGroup>
                    </Form>
                  </Col>
             <Col md="5" />
                  </Row>
                  <Row>
                  <Col md="7">
                    <Form>
                    <FormGroup>
                      <label className="mb-2">
                       Description
                      </label>
                      <Input
                           name="newDescription"
                           value={newDescription}
                           onChange={onChangeDescription}
                          type="textarea"
                          rows="5"
                      />
                    </FormGroup>
                    </Form>
                  </Col>
             <Col md="2" />
                  </Row>
                        <Row>
                  <Col md="7">
                  <Button className='saveButton' onClick={() => updateBook(selected)}>Save</Button>
              
                    <Button className='addNewButton' onClick={addBook}>Save new</Button>
               
                    <Button className='deleteButton' onClick={() => removeBook(selected)}>Delete</Button>
                
                    <Button className='emptyButton' onClick={emptyForm}>Empty</Button>
                    </Col>
                  </Row>
            </Container>
        </div >
    );
}
  
export default BookList;
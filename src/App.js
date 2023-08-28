import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import BookList from './components/BookList'
import {
    Container, Card, CardHeader,
} from "reactstrap"

  
function App() {

    return (
      <div>
            <Container className="containerApp">
              <Card className='formCard'>
              <CardHeader>
                <h3 className="libraryHeader">
                  Library
                </h3>
              </CardHeader>
              <BookList/>
              </Card>
            </Container>
        </div >
    );
}
  
export default App;
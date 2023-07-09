import './App.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TodosList from './components/TodosList'
import Button from 'react-bootstrap/Button'
import AddTodoModal from './components/AddTodoModal'

function App() {
  const [show, setShow] = useState(false)

  const handleAddTodo = () => {
    setShow(true)
  }

  return (
    <div className="page">
      <Container>
        <Row className="bg-body">
          <Col className="d-flex p-5 justify-content-between">
            <h1 className="title">App de Notas</h1>
            <Button variant="info text-white fw-bold" onClick={handleAddTodo}>
              Agregar
            </Button>
          </Col>
          <TodosList />
        </Row>
      </Container>
      <AddTodoModal show={show} setShow={setShow} />
    </div>
  )
}

export default App

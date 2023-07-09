import './App.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TodosList from './components/TodosList'
import Button from 'react-bootstrap/Button'
import AddTodoModal from './components/AddTodoModal'
import useTodos from './hooks/useTodos'

function App() {
  const [filter, setFilter] = useState('all') // ['all', 'completed', 'uncompleted'
  const { todos, setTodos } = useTodos(filter)
  const [show, setShow] = useState(false)

  const handleAddTodo = () => {
    setShow(true)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div className="page">
      <Container>
        <Row className="bg-body">
          <Col className="d-flex p-5 justify-content-between align-items-center sm-10">
            <h1 className="title">App de Notas</h1>
            <div className="filter-container">
              <label htmlFor="filter">Filtro:</label>
              <select
                className="selector"
                name="filter"
                value={filter}
                onChange={handleFilter}
                id=""
              >
                <option value="all">Todas</option>
                <option value="completed">Completadas</option>
                <option value="uncompleted">Incompletas</option>
              </select>
            </div>
          </Col>
          <Col sm="2" className="d-flex p-5 justify-content-between">
            <Button variant="info text-white fw-bold" onClick={handleAddTodo}>
              Agregar
            </Button>
          </Col>
          <TodosList filter={filter} todos={todos} setTodos={setTodos} />
        </Row>
      </Container>
      <AddTodoModal
        show={show}
        setShow={setShow}
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  )
}

export default App

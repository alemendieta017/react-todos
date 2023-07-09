import PropTypes from 'prop-types'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Form } from 'react-bootstrap'
import { addTodo } from '../services/todos'
import Alert from 'react-bootstrap/Alert'

function AddTodoModal({ show, setShow, todos, setTodos }) {
  const [msg, setMsg] = useState(null)
  const [newTitle, setNewTitle] = useState('')

  const handleClose = () => {
    setMsg(null)
    setShow(false)
    setNewTitle('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newTodo = {
      id: todos.length + 1,
      title: e.target.todoTitle.value,
      completed: e.target.completed.checked,
    }

    try {
      const addedTodo = await addTodo(newTodo)
      console.log(addedTodo)
      setTodos([addedTodo, ...todos])
      setMsg({
        type: 'success',
        message: 'Tarea agregada correctamente',
      })
      e.target.reset()
      setNewTitle('')
    } catch (error) {
      setMsg({
        type: 'danger',
        message: error.message,
      })
    }
  }

  const handleChange = (e) => {
    setNewTitle(e.target.value)
    if (!newTitle.match(/^[^\d]*$/)) {
      setMsg({
        type: 'danger',
        message: 'El título no puede contener números',
      })
    }
  }

  return (
    <Modal show={show} onHide={handleClose} keyboard={false}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {msg && (
            <Alert variant={msg.type} onClose={() => setMsg(null)} dismissible>
              {msg.message}
            </Alert>
          )}
          <Form.Group className="mb-3" controlId="todoTitle">
            <Form.Label>Tarea</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lavar la ropa..."
              value={newTitle}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Check type="checkbox" id="completed" label="Completado" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button type="submit" variant="success">
            Añadir
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

AddTodoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
  setTodos: PropTypes.func.isRequired,
}

export default AddTodoModal

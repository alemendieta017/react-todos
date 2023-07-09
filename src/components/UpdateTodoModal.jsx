import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Form } from 'react-bootstrap'
import { updateTodoById } from '../services/todos'

function updateTodoModal({
  show,
  setShow,
  selectedTodo,
  setMsg,
  setTodos,
  todos,
}) {
  const handleClose = () => {
    setMsg(null)
    setShow(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newTodo = {
      id: selectedTodo.current.id,
      title: e.target.todoTitle.value,
      completed: e.target.completed.checked,
    }

    try {
      const updatedtodo = await updateTodoById(selectedTodo.current.id, newTodo)
      setTodos(
        todos.map((todo) =>
          todo.id === selectedTodo.current.id ? updatedtodo : todo
        )
      )
      setMsg({
        type: 'success',
        message: 'Tarea actualizada correctamente',
      })
      e.target.reset()
      setShow(false)
    } catch (error) {
      setMsg({
        type: 'danger',
        message: error.message,
      })
      setShow(false)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} keyboard={false}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="todoTitle">
            <Form.Label>Tarea</Form.Label>
            <Form.Control
              type="text"
              defaultValue={selectedTodo.current.title}
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            id="completed"
            label="Completado"
            defaultChecked={selectedTodo.current.completed}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button type="submit" variant="success">
            Actualizar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

updateTodoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  selectedTodo: PropTypes.object.isRequired,
  setMsg: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
}

export default updateTodoModal

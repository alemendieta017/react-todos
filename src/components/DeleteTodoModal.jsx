import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { deleteTodoById } from '../services/todos'

function DeleteTodoModal({
  show,
  setShow,
  selectedTodo,
  setMsg,
  setTodos,
  todos,
}) {
  const handleClose = () => {
    setShow(false)
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodoById(id)
      setTodos(todos.filter((todo) => todo.id !== id))
      setMsg({
        type: 'success',
        message: 'Tarea eliminada correctamente',
      })
      setShow(false)
    } catch (error) {
      setMsg({
        type: 'danger',
        message: error.message,
      })
    }
  }

  return (
    <Modal show={show} onHide={handleClose} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Desea eliminar tarea? Id: {selectedTodo.current.id}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button
          onClick={() => {
            handleDelete(selectedTodo.current.id)
          }}
          variant="danger"
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

DeleteTodoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  selectedTodo: PropTypes.object.isRequired,
  setMsg: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
}

export default DeleteTodoModal

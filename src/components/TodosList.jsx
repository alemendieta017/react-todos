import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import { useState, useRef } from 'react'
import useTodos from '../hooks/useTodos'
import DeleteTodoModal from './DeleteTodoModal'
import UpdateTodoModal from './UpdateTodoModal'
import { updateTodoById } from '../services/todos'

const TodosList = () => {
  const { todos, setTodos } = useTodos()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const selectedTodo = useRef({})
  const [msg, setMsg] = useState(null)

  const handleDeleteIcon = (todo) => {
    selectedTodo.current = {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    }
    setShowDeleteModal(true)
  }

  const handleUpdateIcon = (todo) => {
    selectedTodo.current = {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    }
    setShowUpdateModal(true)
  }

  const handleComplete = async (todo) => {
    try {
      selectedTodo.current = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
      }
      const updatedTodo = await updateTodoById(todo.id, selectedTodo.current)
      setTodos(
        todos.map((todo) =>
          todo.id === selectedTodo.current.id ? updatedTodo : todo
        )
      )
    } catch (error) {
      setMsg({
        type: 'danger',
        message: error.message,
      })
    }
  }

  return (
    <div className="p-3">
      {msg && (
        <Alert variant={msg.type} onClose={() => setMsg(null)} dismissible>
          {msg.message}
        </Alert>
      )}
      <Table className="primary align-middle table-hover ">
        <thead className="table-secondary">
          <tr>
            <th>Asunto</th>
            <th>Completado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr
              key={todo.id}
              className={
                todo.completed
                  ? 'text-secondary text-decoration-line-through'
                  : 'table-warning'
              }
            >
              <td className="align-middle">{todo.title}</td>
              <td className="align-middle text-center">
                <input
                  type="checkbox"
                  defaultChecked={todo.completed}
                  onChange={() => {
                    handleComplete(todo)
                  }}
                />
              </td>
              <td>
                <div className="icons-container">
                  <i
                    className="bi bi-pencil-square"
                    onClick={() => {
                      handleUpdateIcon(todo)
                    }}
                  ></i>
                  <i
                    onClick={() => {
                      handleDeleteIcon(todo)
                    }}
                    className="bi bi-x-circle"
                  ></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DeleteTodoModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        selectedTodo={selectedTodo}
        setMsg={setMsg}
        setTodos={setTodos}
        todos={todos}
      />
      <UpdateTodoModal
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        selectedTodo={selectedTodo}
        setMsg={setMsg}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  )
}

export default TodosList

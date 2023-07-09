import { useState, useEffect } from 'react'
import todosMock from '../mocks/todos.json'
import { getTodos } from '../services/todos'

const useTodos = (filter) => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    try {
      const fetchTodos = async () => {
        const todos = await getTodos()
        setTodos(todos)
      }
      fetchTodos()
    } catch (error) {
      console.log(error)
      setTodos(todosMock)
    }
  }, [])

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') {
      return todo.completed
    } else if (filter === 'uncompleted') {
      return !todo.completed
    } else {
      return true
    }
  })

  return { todos: filteredTodos, setTodos }
}

export default useTodos

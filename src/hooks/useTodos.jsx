import { useState, useEffect } from 'react'
import todosMock from '../mocks/todos.json'
import { getTodos } from '../services/todos'

const useTodos = () => {
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

  return { todos, setTodos }
}

export default useTodos

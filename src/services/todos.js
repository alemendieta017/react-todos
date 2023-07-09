const API_URL = 'https://jsonplaceholder.typicode.com'

export async function getTodos() {
  try {
    const response = await fetch(`${API_URL}/todos`)
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Error al obtener los datos')
  }
}

export async function addTodo(payload) {
  if (!payload.title) {
    throw new Error('El título es obligatorio')
  } else if (!payload.title.match(/^[^\d]*$/)) {
    throw new Error('El título no puede contener números')
  }

  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Error al añadir tarea')
  }
}

export async function deleteTodoById(id) {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Error al eliminar tarea')
  }
}

export async function updateTodoById(id, payload) {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Error al actualizar tarea')
  }
}

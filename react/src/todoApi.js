const URL = "http://localhost:3001"

export async function getTodos({signal}) {
  const response = await fetch(URL + "/todos", {signal})

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  return response.json()
}

export async function postTodo(todo) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(todo)
  }
  const response = await fetch(`${URL}/todos`, requestOptions)

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  return response.json()
}

export async function patchTodo(id, mutationObject) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(mutationObject)
  }
  const response = await fetch(`${URL}/todos/${id}`, requestOptions)

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  return response.json()
}

export async function deleteTodo(id) {
  const requestOptions = {
    method: "DELETE",
  }
  const response = await fetch(`${URL}/todos/${id}`, requestOptions)

  if (!response.ok) {
     throw new Error(`HTTP error: ${response.status}`)
  }
}

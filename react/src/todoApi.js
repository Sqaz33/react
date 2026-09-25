

const URL = "http://localhost:3001"

export async function getTodos() {
  const response = await fetch(URL + "/todos")

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
  const response = await fetch(URL + "/todos", requestOptions)
  
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  return response.json()
}
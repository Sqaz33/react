const TODO_KEY = "TODO_KEY"

const initialTodos = [
  { id: 3, title: 'Научиться работать со state', completed: false, details: { priority: "low" } },
  { id: 2, title: 'Разобраться с props', completed: false, details: { priority: "normal" } },
  { id: 1, title: 'Изучить JSX', completed: true, details: { priority: "high" } },
]

export function load() {
  try {
    const saved = localStorage.getItem(TODO_KEY)
    if (saved === null) {
      return initialTodos
    }
    const data = JSON.parse(saved)
    if (!Array.isArray(data)) {
      return initialTodos
    }
    return data
  } catch (error) {
    console.log(error.message)
  }
  return initialTodos
}

export function save(value) {
  try {
    localStorage.setItem(TODO_KEY, JSON.stringify(value))
  } catch (error) {
    console.log(error.message)
  }
}
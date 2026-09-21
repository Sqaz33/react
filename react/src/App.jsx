import TodoHeader from "./TodoHeader"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import TodoLayout from "./TodoLayout"
import { useState } from "react"


function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Изучить JSX', completed: true },
    { id: 2, title: 'Разобраться с props', completed: false },
    { id: 3, title: 'Научиться работать со state', completed: false },
  ])

  function addTodo(title) {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false
    }
    setTodos(curTodos => [...curTodos, newTodo])
  }

  function toggleTodo(id) {
    setTodos(
      curTodos => curTodos.map(
        todo => todo.id === id ?
          {...todo, completed: !todo.completed} :
          todo
    ))
  }

  function deleteTodo(id) {
    setTodos(
      curTodos => curTodos.filter(todo => todo.id !== id)
    )
  }

  function duplicateTodo(id) {
    const found = todos.find(todo => todo.id === id)
    if (!found) {
      return
    }
    const {title} = found
    const newTitle = title + " (копия)"
    const duplicate = {
      ...found,
      id: Date.now(),
      title: newTitle,
      completed: false
    }
    setTodos(curTodos => [...curTodos, duplicate])
  }

  const totalCount = todos.length
  const remainingCount = todos.filter(todo => todo.completed === false).length // minimal state
  const completedCount = todos.reduce((sum, todo) => todo.completed ? sum + 1 : sum, 0)
  const nextTodo = todos.find(todo => !todo.completed)
  const hasCompletedTodos = todos.some(todo => todo.completed)
  const areAllTodosCompleted = todos.length > 0 && todos.every(todo => todo.completed)

  const sortedTodos = [...todos].sort(
    (a, b) => {
      return Number(a.completed) - Number(b.completed)
    }
  )

  return (
    <TodoLayout>
      <TodoHeader
        todosStats={{ totalCount, remainingCount, completedCount }}
        nextTodo={nextTodo}
        hasCompletedTodos={hasCompletedTodos}
        areAllTodosCompleted={areAllTodosCompleted}
      />
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todos={sortedTodos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
        onDuplicateTodo={duplicateTodo}
      />
    </TodoLayout>
  )
}

export default App

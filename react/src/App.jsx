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
  ]);

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

  const total = todos.length;
  const remaining = todos.filter(todo => todo.completed === false).length // minimal state

  return (
    <TodoLayout>
      <TodoHeader total={total} remaining={remaining}/>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList
        todos={todos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
    </TodoLayout>
  )
}

export default App

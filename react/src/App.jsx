import TodoHeader from "./TodoHeader"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import TodoLayout from "./TodoLayout"
import { useState } from "react"
import { getNextPriority } from "./priority"
import { saveTodos } from "./fakeTodoService"
import TodoSearch from "./TodoSearch"
import useDebouncedValue from "./useDebouncedValue"
import useOnlineStatus from "./useOnlineStatus"

function App() {
  const [todos, setTodos] = useState([
    { id: 3, title: 'Научиться работать со state', completed: false, details: { priority: "low" } },
    { id: 2, title: 'Разобраться с props', completed: false, details: { priority: "normal" } },
    { id: 1, title: 'Изучить JSX', completed: true, details: { priority: "high" } },
  ])
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [searchText, setSearchText] = useState("")
  const debouncedSearchText = useDebouncedValue(searchText, 400)
  const isOnline = useOnlineStatus()

  function addTodo(title) {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
      details: {priority: "low"}
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

  function toggleTodoPriority(id) {
    setTodos(curTodos => curTodos.map(todo => { // обновляется иммутабельно - не на прямую через todos=...
      if (todo.id === id) {
        return {
          ...todo,
          details: {
            ...todo.details,
            priority: getNextPriority(todo.details.priority)
          }
        }
      }
      return todo
    }))
  }

  function deleteTodo(id) {
    setTodos(
      curTodos => curTodos.filter(todo => todo.id !== id)
    )
  }

  function duplicateTodo(id) {
    const newId = Date.now();
    setTodos(
      curTodos => {
        const found = curTodos.find(todo => todo.id === id)
        if (!found) {
          return curTodos
        }
        const foundClone = structuredClone(found)
        const {title} = foundClone
        const newTitle = title + " (копия)"
        const duplicate = {
          ...foundClone,
          id: newId,
          title: newTitle,
          completed: false
        }
        return [...curTodos, duplicate]
      }
    )
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

  const visibleTodos = sortedTodos.filter(
    todo => {
      const trimmed = debouncedSearchText.trim()
      return trimmed.length === 0 || todo.title.toLowerCase().includes(trimmed.toLowerCase())
    }
  )

  async function handleSaveTodos() {
    setIsSaving(true)
    setSaveMessage("")
    try {
      const {savedCount} = await saveTodos(todos)
      setSaveMessage(`Сохранено задач: ${savedCount}`)
    } catch (error) {
      setSaveMessage(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  // const delayedSearch = debounce()x
  function handleSearchTextChange(text) {
    setSearchText(text)
  }

  return (
    <TodoLayout>
      <TodoHeader
        todosStats={{ totalCount, remainingCount, completedCount }}
        nextTodo={nextTodo}
        hasCompletedTodos={hasCompletedTodos}
        areAllTodosCompleted={areAllTodosCompleted}
        isSaving={isSaving}
        saveMessage={saveMessage}
        onSaveTodos={handleSaveTodos}
        isOnline={isOnline}
      />
      <TodoForm onAddTodo={addTodo} />
      <TodoSearch 
        searchText={searchText} 
        onSearchTextChange={handleSearchTextChange}
      />
      <TodoList
        todos={visibleTodos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
        onDuplicateTodo={duplicateTodo}
        onToggleTodoPriority={toggleTodoPriority}
      />
    </TodoLayout>
  )
}

export default App

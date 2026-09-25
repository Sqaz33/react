import TodoHeader from "./TodoHeader"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import TodoLayout from "./TodoLayout"
import { useCallback, useEffect, useMemo, useReducer, useState } from "react"
import { getNextPriority } from "./priority"
import { saveTodos } from "./fakeTodoService"
import TodoSearch from "./TodoSearch"
import useDebouncedValue from "./useDebouncedValue"
import useOnlineStatus from "./useOnlineStatus"
import { getTodos, postTodo } from "./todoApi"
import {
  initialSaveState,
  saveActionTypes,
  saveStateStatuses,
  saveReducer
} from "./saveReducer"
import { ThemeContext } from "./ThemeContext"

const initialTodos = [
  { id: 3, title: 'Научиться работать со state', completed: false, details: { priority: "low" } },
  { id: 2, title: 'Разобраться с props', completed: false, details: { priority: "normal" } },
  { id: 1, title: 'Изучить JSX1234', completed: true, details: { priority: "high" } },
]

function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [saveState, dispatchSave] = useReducer(saveReducer, initialSaveState)
  const [searchText, setSearchText] = useState("")
  const [theme, setTheme] = useState("light")
  const debouncedSearchText = useDebouncedValue(searchText, 400)
  const isOnline = useOnlineStatus()

  useEffect(() => {
    async function loadTodos() {
      try {
        const todos = await getTodos()
        setTodos(todos)
      } catch (error) {
        console.error(error.message)
      }
    } 
    loadTodos()
  }, [])

  async function addTodo(title) {
    const todoData = {
      title,
      completed: false,
      details: {priority: "low"}
    }
    try {
      const createdTodo = await postTodo(todoData)
      setTodos(curTodos => [...curTodos, createdTodo])
    } catch (error) {
      console.error(error.message)
    }
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

  const visibleTodos = useMemo(() => {
    const sortedTodos = [...todos].sort(
      (a, b) => {
        return Number(a.completed) - Number(b.completed)
      }
    )
    const trimmedLowerCase = debouncedSearchText.trim().toLowerCase()

    return sortedTodos.filter(
      todo => {
        const titleLowerCase = todo.title.toLowerCase()
        return trimmedLowerCase.length === 0 || titleLowerCase.includes(trimmedLowerCase)
      }
    )
  }, [todos, debouncedSearchText])

  async function handleSaveTodos() {
    dispatchSave({type: saveActionTypes.started})
    try {
      const {savedCount} = await saveTodos(todos)
      dispatchSave({
        type: saveActionTypes.succeeded,
        payload: { savedCount }
      })
    } catch (error) {
      const {message} = error
      dispatchSave({
        type: saveActionTypes.failed,
        payload: { message }
      })
    }
  }

  // const delayedSearch = debounce()x
  function handleSearchTextChange(text) {
    setSearchText(text)
  }

  function clearCompletedTodos() {  
    setTodos(curTodos => curTodos.filter(todo => !todo.completed))
  }

  const isSaving = saveState.status === saveStateStatuses.saving
  const isSaveError = saveState.status === saveStateStatuses.error
  const saveMessage = saveState.message

  const toggleTheme = useCallback(() => {
    setTheme(curTheme => curTheme === "light" ? "dark" : "light")
  }, [])

  const themeContextValue = useMemo(
    () => { return {theme, toggleTheme}},
    [theme, toggleTheme]
  )

  return (
    <ThemeContext value={themeContextValue}>
      <TodoLayout>
        <TodoHeader
          todosStats={{ totalCount, remainingCount, completedCount }}
          nextTodo={nextTodo}
          hasCompletedTodos={hasCompletedTodos}
          areAllTodosCompleted={areAllTodosCompleted}
          isSaving={isSaving}
          saveMessage={saveMessage}
          isSaveError={isSaveError}
          onSaveTodos={handleSaveTodos}
          isOnline={isOnline}
          onClearCompletedTodos={clearCompletedTodos}
        />
        <TodoForm onAddTodo={addTodo} />
        <section aria-labelledby="todo-list-heading">
          <h2 id="todo-list-heading">Задачи</h2>
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
        </section>
      </TodoLayout>
    </ThemeContext>
  )
}

export default App

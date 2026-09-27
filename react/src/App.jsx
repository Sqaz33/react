import TodoHeader from "./TodoHeader"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import TodoLayout from "./TodoLayout"
import { useCallback, useMemo, useReducer, useState } from "react"
import { saveTodos } from "./fakeTodoService"
import TodoSearch from "./TodoSearch"
import useDebouncedValue from "./useDebouncedValue"
import useOnlineStatus from "./useOnlineStatus"
import {
  initialSaveState,
  saveActionTypes,
  saveStateStatuses,
  saveReducer
} from "./saveReducer"
import { ThemeContext } from "./ThemeContext"
import {
  apiStateStatuses
} from "./apiReducer"
import useTodos from "./todoLifeCycle"

function App() {
  const {
    todos, 
    apiState, 
    addTodo, 
    toggleTodo,
    toggleTodoPriority, 
    deleteTask} = useTodos()
  const [saveState, dispatchSave] = useReducer(saveReducer, initialSaveState)
  const [searchText, setSearchText] = useState("")
  const debouncedSearchText = useDebouncedValue(searchText, 400)
  const isOnline = useOnlineStatus()
  const [isDeletingCompleted, setIsDeletedCompleted] = useState(false)
  const [theme, setTheme] = useState("light")
  const toggleTheme = useCallback(() => {
    setTheme(curTheme => curTheme === "light" ? "dark" : "light")
  }, [])
  const themeContextValue = useMemo(
    () => { return {theme, toggleTheme}},
    [theme, toggleTheme]
  )

  const totalCount = todos.length
  const remainingCount = todos.filter(todo => todo.completed === false).length // minimal state
  const completedCount = todos.reduce((sum, todo) => todo.completed ? sum + 1 : sum, 0)
  const nextTodo = todos.find(todo => !todo.completed)
  const hasCompletedTodos = todos.some(todo => todo.completed)
  const areAllTodosCompleted = todos.length > 0 && todos.every(todo => todo.completed)
  const isSaving = saveState.status === saveStateStatuses.saving
  const isSaveError = saveState.status === saveStateStatuses.error
  const saveMessage = saveState.message
  const apiMessage = apiState.message
  const isApiError = apiState.status === apiStateStatuses.error

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

  async function duplicateTodo(id) {
    const found = todos.find(todo => todo.id == id)
    const title = found.title + " (копия)"
    await addTodo(title, found.completed, found.details.priority)
  }

  // const delayedSearch = debounce()x
  function handleSearchTextChange(text) {
    setSearchText(text)
  }

  async function clearCompletedTodos() { 
    setIsDeletedCompleted(true)
    const completed = todos.map(todo => todo.completed)
    for (const todo of completed) {
      await deleteTask(todo)
    }
    setIsDeletedCompleted(false)
  }

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
          apiMessage={apiMessage}
          isApiError={isApiError}
          isDeletingCompleted={isDeletingCompleted}
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
            onDeleteTodo={deleteTask}
            onDuplicateTodo={duplicateTodo}
            onToggleTodoPriority={toggleTodoPriority}
          />
        </section>
      </TodoLayout>
    </ThemeContext>
  )
}

export default App

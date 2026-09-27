import TodoHeader from "../TodoHeader"
import TodoForm from "../TodoForm"
import TodoList from "../TodoList"
import TodoLayout from "../TodoLayout"
import { useCallback, useMemo, useState } from "react"
import TodoSearch from "../TodoSearch"
import useDebouncedValue from "../useDebouncedValue"
import useOnlineStatus from "../useOnlineStatus"
import { ThemeContext } from "../ThemeContext"
import { apiStatuses } from "../apiReducer"
import useTodos from "../useTodos"

function TodoPage() {
  const {
    todos,
    loadState,
    mutationState,

    addTodo,
    toggleTodo,
    toggleTodoPriority,
    deleteTask,
    duplicateTodo,
    clearCompletedTodos
  } = useTodos()
  const [searchText, setSearchText] = useState("")
  const debouncedSearchText = useDebouncedValue(searchText, 400)
  const isOnline = useOnlineStatus()
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


  // const delayedSearch = debounce()
  function handleSearchTextChange(text) {
    setSearchText(text)
  }

  const isLoadingRunning = loadState.status === apiStatuses.running
  const loadingMessage = loadState.message
  const isLoadingError = loadState.status === apiStatuses.error
  const isLoadingSuccess = loadState.status === apiStatuses.success
  const isMutationRunning = mutationState.status === apiStatuses.running
  const mutationMessage = mutationState.message
  const isMutationError = mutationState.status === apiStatuses.error

  return (
    <ThemeContext value={themeContextValue}>
      <TodoLayout>
        <TodoHeader
          todosStats={{ totalCount, remainingCount, completedCount }}
          nextTodo={nextTodo}
          hasCompletedTodos={hasCompletedTodos}
          areAllTodosCompleted={areAllTodosCompleted}
          isOnline={isOnline}
          onClearCompletedTodos={clearCompletedTodos}
          loadingMessage={loadingMessage}
          isLoadingError={isLoadingError}
          isMutationRunning={isMutationRunning}
          mutationMessage={mutationMessage}
          isMutationError={isMutationError}
        />
        <TodoForm 
          onAddTodo={addTodo} 
          isLoadingRunning={isLoadingRunning}
          isMutationRunning={isMutationRunning}
        />
        <section aria-labelledby="todo-list-heading">
          <h2 id="todo-list-heading">Задачи</h2>
          <TodoSearch
            searchText={searchText}
            onSearchTextChange={handleSearchTextChange}
          />
          {isLoadingSuccess &&      
            (<TodoList
              todos={visibleTodos}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTask}
              onDuplicateTodo={duplicateTodo}
              onToggleTodoPriority={toggleTodoPriority}
              isMutationRunning={isMutationRunning}
            />)
          }
        </section>
      </TodoLayout>
    </ThemeContext>
  )
}

export default TodoPage

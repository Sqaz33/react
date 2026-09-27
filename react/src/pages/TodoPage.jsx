import TodoHeader from "../TodoHeader"
import TodoForm from "../TodoForm"
import TodoList from "../TodoList"
import { useMemo } from "react"
import TodoSearch from "../TodoSearch"
import useDebouncedValue from "../useDebouncedValue"
import useOnlineStatus from "../useOnlineStatus"
import { apiStatuses } from "../apiReducer"
import { useOutletContext, useSearchParams } from "react-router"

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
    clearCompletedTodos} = useOutletContext()

  const isOnline = useOnlineStatus()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchText = searchParams.get("q") ?? ""
  const debouncedSearchText = useDebouncedValue(searchText, 400)

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
    const nextParams = new URLSearchParams(searchParams)
    if (text === "") {
      nextParams.delete("q")
    } else {
      nextParams.set("q", text)
    }
    setSearchParams(nextParams, { replace: true})
  }

  const isLoadingRunning = loadState.status === apiStatuses.running
  const loadingMessage = loadState.message
  const isLoadingError = loadState.status === apiStatuses.error
  const isLoadingSuccess = loadState.status === apiStatuses.success
  const isMutationRunning = mutationState.status === apiStatuses.running
  const mutationMessage = mutationState.message
  const isMutationError = mutationState.status === apiStatuses.error

  return (
    <>
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
    </>
  )
}

export default TodoPage

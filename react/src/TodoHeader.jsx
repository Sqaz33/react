import TodoContent from "./TodoContent"
import { useTheme } from "./ThemeContext"
import { Link } from "react-router"

function TodoHeader({
  todosStats, 
  nextTodo, 
  hasCompletedTodos, 
  areAllTodosCompleted, 
  isOnline,
  onClearCompletedTodos,
  loadingMessage,
  isLoadingError,
  isMutationRunning,
  mutationMessage,
  isMutationError
}) {
  const {theme, toggleTheme} = useTheme()

  return (
    <header className="todo-header">
      <h1>Todo</h1>
      <dl className="todo-stats">
        <div>
          <dt>Всего</dt> 
          <dd>{todosStats.totalCount}</dd>
        </div>
        <div>
          <dt>Выполнено</dt> 
          <dd>{todosStats.completedCount}</dd>
        </div>
          <div>
          <dt>Осталось</dt> 
          <dd>{todosStats.remainingCount}</dd>
        </div>
        <div>
          <dt>Следующая задача</dt> 
          <dd>{nextTodo ? <TodoContent item={nextTodo} /> : "нет"}</dd>
        </div>
        <div>
          <dt>Сеть</dt> 
          <dd role="status">{isOnline ? "подключена" : "отсутствует"}</dd>
        </div>
      </dl>
      <p>
        {hasCompletedTodos 
          ? "Есть завершённые задачи" 
          : "Нет завершённых задач"}
      </p>
      {areAllTodosCompleted && (<p aria-live="polite">Все задачи завершены</p>)}
      <div className="todo-header-actions">
        <button 
          onClick={onClearCompletedTodos}
          disabled={!hasCompletedTodos || isMutationRunning}
          type="button"
        >
          Удалить выполненные
        </button>
        <button
          onClick={toggleTheme}
          aria-pressed={theme === "dark"}
          type="button"
        >
          Тёмная тема
        </button>
      </div>
      {loadingMessage && (
        <span
          className={"api-message" + (isLoadingError ? " error" : "")}
          role={isLoadingError ? "alert" : "status"}
        >
          {loadingMessage}
        </span>
      )}
      {mutationMessage && (
        <span
          className={"api-message" + (isMutationError ? " error" : "")}
          role={isMutationError ? "alert" : "status"}
        >
          {mutationMessage}
        </span>
      )}
      <nav aria-label="Основная навигация">
        <Link to="/settings">Настройки</Link>
        <Link to="/todos">Задачи</Link>
      </nav>
    </header>
  )
}

export default TodoHeader

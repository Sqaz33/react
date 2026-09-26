import TodoContent from "./TodoContent"
import { useTheme } from "./ThemeContext"

function TodoHeader({
  todosStats, 
  nextTodo, 
  hasCompletedTodos, 
  areAllTodosCompleted, 
  isSaving, 
  saveMessage,
  isSaveError,
  onSaveTodos,
  isOnline,
  onClearCompletedTodos,
  apiMessage,
  isApiError
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
          onClick={onSaveTodos}
          disabled={isSaving}
          type="button"
        >
          {isSaving ? "Сохранение..." : "Сохранить"}
        </button>
        <button 
          onClick={onClearCompletedTodos}
          disabled={!hasCompletedTodos}
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
      {saveMessage && (
        <span
          className={"save-message" + (isSaveError ? " error" : "")}
          role={isSaveError ? "alert" : "status"}
        >
          {saveMessage}
        </span>
      )}
      {apiMessage && (
        <span
          className={"api-message" + (isApiError ? " error" : "")}
          role={isApiError ? "alert" : "status"}
        >
          {apiMessage}
        </span>
      )}
    </header>
  )
}

export default TodoHeader

import TodoContent from "./TodoContent"

function TodoHeader({
  todosStats, 
  nextTodo, 
  hasCompletedTodos, 
  areAllTodosCompleted, 
  isSaving, 
  saveMessage, 
  onSaveTodos,
  isOnline,
  onClearCompletedTodos,
}) {
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
      <button
        onClick={onSaveTodos}
        disabled={isSaving}
        type="button"
      >
        {isSaving ? "Сохранение..." : "Сохранить"}
      </button>
      <span role="status">{saveMessage}</span>
      <button 
        onClick={onClearCompletedTodos}
        disabled={!hasCompletedTodos}
        type="button"
      >
        Удалить выполненные  
      </button>
    </header>
  )
}

export default TodoHeader

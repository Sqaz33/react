import TodoContent from "./TodoContent"


function TodoHeader({todosStats, nextTodo, hasCompletedTodos, areAllTodosCompleted}) {
  return (
    <header className="todo-header">
      <h1>Todo</h1>
      <span>Всего: {todosStats.totalCount}</span>
      <span>Выполнено: {todosStats.completedCount}</span>
      <span>Осталось: {todosStats.remainingCount}</span>
      <span>Следующая задача: {nextTodo ? <TodoContent item={nextTodo} /> : "нет"}</span>
      <span>{hasCompletedTodos ? "Есть завершённые задачи" : "Нет завершённых задач"}</span>
      {areAllTodosCompleted && <span>Все задачи завершены</span>}
    </header>
  )
}

export default TodoHeader
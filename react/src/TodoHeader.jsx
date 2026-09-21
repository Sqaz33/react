import TodoContent from "./TodoContent"


function TodoHeader({totalCount, remainingCount, nextTodo, hasCompletedTodos, areAllTodosCompleted}) {
  return (
    <header className="todo-header">
      <h1>Todo</h1>
      <span>Всего: {totalCount}</span>
      <span>Осталось: {remainingCount}</span>
      <span>Следующая задача: {nextTodo ? <TodoContent item={nextTodo} /> : "нет"}</span>
      <span>{hasCompletedTodos ? "Есть завершённые задачи" : "Нет завершённых задач"}</span>
      {areAllTodosCompleted && <span>Все задачи завершены</span>}
    </header>
  )
}

export default TodoHeader
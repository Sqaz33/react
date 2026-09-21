
function TodoHeader({total, remaining}) {
  return (
    <header className="todo-header">
      <h1>Todo</h1>
      <span>Всего: {total}</span>
      <span>Осталось: {remaining}</span>
    </header>
  )
}

export default TodoHeader
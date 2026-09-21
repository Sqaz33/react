import TodoContent from "./TodoContent"

function TodoItem({item, onToggleTodo, onDeleteTodo, onDuplicateTodo}) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggleTodo(item.id)}
      />
      <TodoContent item={item} />
      <div className="todo-actions">
        <button
          onClick={() => onDeleteTodo(item.id)}
          type="button"
        >
          Удалить
        </button>
        <button
          onClick={() => onDuplicateTodo(item.id)}
          type="button"
        >
          Дублировать
        </button>
      </div>
    </li>
  )
}

export default TodoItem

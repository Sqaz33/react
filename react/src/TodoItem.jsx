import TodoContent from "./TodoContent"

function TodoItem({item, onToggleTodo, onDeleteTodo}) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggleTodo(item.id)}
      />
      <TodoContent item={item} />
      <button
        onClick={() => onDeleteTodo(item.id)}
        type="button"
      >
        Удалить
      </button>
    </li>
  )
}

export default TodoItem

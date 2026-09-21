import TodoContent from "./TodoContent"

const priorityLabels = {
  low: "низкий",
  normal: "средний",
  high: "высокий"
}

function TodoItem({item, onToggleTodo, onDeleteTodo, onDuplicateTodo, onToggleTodoPriority}) {
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
        <button
          onClick={() => onToggleTodoPriority(item.id)}
          type="button"
        >
          Приоритет: {priorityLabels[item.details.priority] ?? "неизвестный"}
        </button>
      </div>
    </li>
  )
}

export default TodoItem

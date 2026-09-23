import TodoContent from "./TodoContent"
import { PRIORITY_LABELS } from "./priority"

function TodoItem({item, onToggleTodo, onDeleteTodo, onDuplicateTodo, onToggleTodoPriority}) {
  return (
    <li className="todo-item">
      <label className="todo-toggle">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggleTodo(item.id)}
        />
        <TodoContent item={item} />
      </label>
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
          className="priority-button"
          onClick={() => onToggleTodoPriority(item.id)}
          type="button"
        >
          Приоритет: {PRIORITY_LABELS[item.details.priority] ?? "неизвестный"}
        </button>
      </div>
    </li>
  )
}

export default TodoItem

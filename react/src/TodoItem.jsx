import TodoContent from "./TodoContent"
import { PRIORITY_LABELS } from "./priority"
import styled from "styled-components"

const PriorityButton = styled.button`
  font-weight: ${({$important}) => $important ? 700 : 400};
  flex-shrink: 0;
  min-width: 150px;
`

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
          aria-label="Удалить"
        >
          X
        </button>
        <button
          onClick={() => onDuplicateTodo(item.id)}
          type="button"
        >
          Дублировать
        </button>
        <PriorityButton
          onClick={() => onToggleTodoPriority(item.id)}
          type="button"
          $important={item.details.priority === "high"}
        >
          Приоритет: {PRIORITY_LABELS[item.details.priority] ?? "неизвестный"}
        </PriorityButton>
      </div>
    </li>
  )
}

export default TodoItem

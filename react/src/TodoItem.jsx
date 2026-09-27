import { Link } from "react-router"
import TodoContent from "./TodoContent"
import { PRIORITY_LABELS } from "./priority"
import styled from "styled-components"

const PriorityButton = styled.button`
  font-weight: ${({$important}) => $important ? 700 : 400};
  flex-shrink: 0;
  min-width: 150px;
`

function TodoItem({
  item, 
  onToggleTodo, 
  onDeleteTodo, 
  onDuplicateTodo, 
  onToggleTodoPriority,
  isMutationRunning}
) {
  return (
    <li className="todo-item">
      <div className="todo-toggle">
        <input
          type="checkbox"
          checked={item.completed}
          disabled={isMutationRunning}
          onChange={() => onToggleTodo(item.id)}
          aria-label={`Статус задачи «${item.title}»`}
        />
        <Link
          to={item.id}
          className="todo-title-link"
        >
          <TodoContent item={item} />
        </Link>
      </div>
      <div className="todo-actions">
        <button
          type="button"
          onClick={() => onDeleteTodo(item.id)}
          disabled={isMutationRunning}
          aria-label="Удалить"
        >
          X
        </button>
        <button
          onClick={() => onDuplicateTodo(item.id)}
          disabled={isMutationRunning}
          type="button"
        >
          Дублировать
        </button>
        <PriorityButton
          onClick={() => onToggleTodoPriority(item.id)}
          type="button"
          disabled={isMutationRunning}
          $important={item.details.priority === "high"}
        >
          Приоритет: {PRIORITY_LABELS[item.details.priority] ?? "неизвестный"}
        </PriorityButton>
      </div>
    </li>
  )
}

export default TodoItem

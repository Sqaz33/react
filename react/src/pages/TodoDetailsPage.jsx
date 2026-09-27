import { useOutletContext, useParams } from "react-router"
import { apiStatuses } from "../apiReducer"
import { PRIORITY_LABELS } from "../priority"

function TodoDetailsPage() {
  const {todos, loadState} = useOutletContext()
  const isLoadingSuccess = loadState.status === apiStatuses.success
  const isError = loadState.status === apiStatuses.error
  const {todoId} = useParams()

  if (isLoadingSuccess) {
    const found = todos.find(todo => todo.id === todoId)
    if (found) {
      return (
        <article>
          <h1>{found.title}</h1>
          <dl className="todo-stats">
            <div>
              <dt>Статус</dt>
              <dd>{found.completed ? "Выполнена" : "Не выполнена"}</dd>
            </div>
            <div>
              <dt>Приоритет</dt>
              <dd>{PRIORITY_LABELS[found.details.priority] ?? "неизвестный"}</dd>
            </div>
          </dl>
        </article>
      )
    } else {
      return (
        <p>Задача не найдена</p>
      )
    }
  } else if (isError) {
      return <p role="alert">{loadState.message}</p>
  } else {
    return <p role="status">Загрузка задачи...</p>
  }
}

export default TodoDetailsPage
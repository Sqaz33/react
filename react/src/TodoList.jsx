import TodoItem from "./TodoItem"

function TodoList({todos, ...itemProps}) {
  if (todos.length === 0) { // условный рендер
    return <p className="empty-message">Задач пока нет</p>
  }

  return (
    <ul className="todo-list">
      {todos.map(item => (
        <TodoItem
          key={item.id}
          item={item}
          {...itemProps}
        />
      ))}
    </ul>
  )
}

export default TodoList

import TodoItem from "./TodoItem"

function TodoList({todos, onToggleTodo, onDeleteTodo}) {
  if (todos.length === 0) { // условный рендер
    return <p className="empty-message">Задач пока нет</p>
  }

  return (
    <ul>
      {todos.map(item => (
        <TodoItem
          key={item.id}
          item={item}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  )
}

export default TodoList

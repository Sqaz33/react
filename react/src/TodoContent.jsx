function TodoContent({item}) {
  return (
    <span
      className={item.completed ? "todo-content completed" : "todo-content"}
    >
      {item.title}
    </span>
  )
}

export default TodoContent

import todoContentStyles from "./styles/TodoContent.module.scss"

function TodoContent({item}) {
  const className = item.completed
    ? `${todoContentStyles.content} ${todoContentStyles.completed}`
    : todoContentStyles.content

  return (
    <span
      className={className}
    >
      {item.title}
    </span>
  )
}

export default TodoContent

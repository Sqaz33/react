import { useState } from "react"

function TodoForm({onAddTodo}) {
  const [title, setTitle] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const cleanTitle = title.trim()
    if (!cleanTitle) {
      return
    }
    onAddTodo(cleanTitle)
    setTitle('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input // controlled input
          value={title}
          onChange={event => setTitle(event.target.value)}
          type="text"
          placeholder="Задача"
        />
        <button type="submit">+</button>
      </form>
    </>
  )
}

export default TodoForm

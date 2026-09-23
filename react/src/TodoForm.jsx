import { useState, useRef } from "react"

function TodoForm({onAddTodo}) {
  const [title, setTitle] = useState('')
  const inputRef = useRef(null)
  
  function handleSubmit(event) {
    event.preventDefault()
    const cleanTitle = title.trim()
    if (!cleanTitle) {
      return
    }
    onAddTodo(cleanTitle)
    setTitle('')
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <label htmlFor="todo-input">Ввод задачи</label>
      <input // controlled input
        value={title}
        onChange={event => setTitle(event.target.value)}
        type="text"
        placeholder="Задача"
        id="todo-input"
        ref={inputRef}
      />
      <button type="submit">+</button>
    </form>
  )
}

export default TodoForm

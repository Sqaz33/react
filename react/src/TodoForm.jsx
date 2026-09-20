import { useState } from "react"

function TodoForm() {
	const [title, setTitle] = useState('')
	
	return (
		<>
			<form>
				<input 
					value={title} 
					onChange={event => setTitle(event.target.value)} 
					type="text" 
					placeholder="Задача"
				/>
				<button type="button">+</button>
			</form>
			<b>{title.length}</b>
		</>
	)
}

export default TodoForm
function TodoItem({item, onToggleTodo, onDeleteTodo}) {
	return (
		<li className={(item.completed ? 'todo-item completed' : 'todo-item')}>
			<input
				type="checkbox"
				checked={item.completed}
				onChange={() => onToggleTodo(item.id)}
			/>
			<span className="todo-title">{item.title}</span>
			<button
				onClick={() => onDeleteTodo(item.id)}
				type="button"
			>
				Удалить
			</button>
		</li>
	)
} 

export default TodoItem

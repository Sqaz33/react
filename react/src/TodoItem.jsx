function TodoItem({item, onToggleTodo, onDeleteTodo}) {
	return (
		<li className={item.completed ? 'completed' : ''}>
			<input
				type="checkbox"
				checked={item.completed}
				onChange={() => onToggleTodo(item.id)}
			/>
			{item.title}
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

function TodoItem({item, onToggleTodo}) {
	return (
		<li className={item.completed ? 'completed' : ''}>
			<input
				type="checkbox"
				checked={item.completed}
				onChange={() => onToggleTodo(item.id)}
			/>
			{item.title}
		</li>
	)
} 

export default TodoItem

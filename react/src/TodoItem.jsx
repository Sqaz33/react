function TodoItem({item}) {
	return (
		<li className={item.completed ? 'completed' : ''}>
			{item.title}
		</li>
	)
} 

export default TodoItem
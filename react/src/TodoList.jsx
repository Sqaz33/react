import TodoItem from "./TodoItem"

function TodoList({todos, onToggleTodo}) {
	return (
		<ul> 
			{todos.map(item => (
				<TodoItem 
					key={item.id} 
					item={item}
					onToggleTodo={onToggleTodo}
				/>	
			))}
		</ul>
	)
}

export default TodoList
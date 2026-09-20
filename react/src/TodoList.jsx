import TodoItem from "./TodoItem"

function TodoList({todos}) {
	return (
		<ul> 
			{todos.map(item => (
				<TodoItem 
					key={item.id} 
					item={item}
				/>	
			))}
		</ul>
	)
}

export default TodoList
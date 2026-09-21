import TodoItem from "./TodoItem"

function TodoList({todos, onToggleTodo, onDeleteTodo}) {
	return (
		<ul> 
			{todos.map(item => (
				<TodoItem 
					key={item.id} 
					item={item}
					onToggleTodo={onToggleTodo}
					onDeleteTodo={onDeleteTodo}
				/>	
			))}
		</ul>
	)
}

export default TodoList
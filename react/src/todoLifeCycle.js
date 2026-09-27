import { 
	useEffect, 
	useRef, 
	useState, 
	useReducer } from "react"
import { apiActionTypes} from "./apiReducer"
import {
  getTodos,
  postTodo,
  patchTodo,
  deleteTodo
} from "./todoApi"
import { getNextPriority } from "./priority"
import {
  initialApiStatus,
  apiReducer,
} from "./apiReducer"

const initialTodos = [
	{ id: 3, title: 'Научиться работать со state', completed: false, details: { priority: "low" } },
	{ id: 2, title: 'Разобраться с props', completed: false, details: { priority: "normal" } },
	{ id: 1, title: 'Изучить JSX1234', completed: true, details: { priority: "high" } },
]

export default function useTodos() {
	const lastRequestId = useRef(0)	
	const [todos, setTodos] = useState(initialTodos)
	const [apiState, dispatchApi] = useReducer(apiReducer, initialApiStatus)

	async function addTodo(
		title,
		completed = false,
		priority = "low")
	{
		const todoData = {
			title,
			completed,
			details: {priority}
		}
		try {
			dispatchApi({
				type: apiActionTypes.started
			})
			const createdTodo = await postTodo(todoData)
			dispatchApi({
				type: apiActionTypes.succeeded
			})
			setTodos(curTodos => [...curTodos, createdTodo])
		} catch (error) {
			dispatchApi({
				type: apiActionTypes.failed,
				payload: {
					message: error.message
				}
			})
			console.error(error.message)
		}
	}

	async function toggleTodo(id) {
		try {
			const curTodo = todos.find(todo => todo.id === id)
			dispatchApi({
				type: apiActionTypes.started
			})
			const patchedTodo = await patchTodo(
				id,
				{completed: !curTodo.completed}
			)
			dispatchApi({
				type: apiActionTypes.succeeded
			})
			setTodos(
				curTodos => curTodos.map(
					todo => todo.id === id ?
						patchedTodo :
						todo
			))
		} catch(error) {
			dispatchApi({
				type: apiActionTypes.failed,
				payload: {
					message: error.message
				}
			})
			console.log(error.message)
		}
	}

	async function toggleTodoPriority(id) {
		try {
			const curTodo = todos.find(todo => todo.id === id)
			const nextPriority = getNextPriority(curTodo.details.priority)
			dispatchApi({
				type: apiActionTypes.started
			})
			const patchedTodo = await patchTodo(
				id,
				{details: {priority: nextPriority}}
			)
			dispatchApi({
				type: apiActionTypes.succeeded
			})
			setTodos(
				curTodos => curTodos.map(
					todo => todo.id === id ?
						patchedTodo :
						todo
			))
		} catch(error) {
			dispatchApi({
				type: apiActionTypes.failed,
				payload: {
					message: error.message
				}
			})
			console.log(error.message)
		}
	}

	async function deleteTask(id) {
		try {
			dispatchApi({
				type: apiActionTypes.started
			})
			await deleteTodo(id)
			dispatchApi({
				type: apiActionTypes.succeeded
			})
			setTodos(
				curTodos => curTodos.filter(todo => todo.id !== id)
			)
		} catch(error) {
			dispatchApi({
				type: apiActionTypes.failed,
				payload: {
					message: error.message
				}
			})
			console.log(error.message)
		}
	}

	useEffect(() => {
		const controller = new AbortController()

		async function loadTodos() {
			const curRequestId = lastRequestId.current
			try {
				dispatchApi({
					type: apiActionTypes.started
				})
				const todos = await getTodos({signal: controller.signal})
				if (lastRequestId.current !== curRequestId) {
					return
				}
				dispatchApi({
					type: apiActionTypes.succeeded
				})
				setTodos(todos)
			} catch (error) {
				if (error.name === "AbortError") {
					return
				}
				dispatchApi({
					type: apiActionTypes.failed,
					payload: {
						message: error.message
					}
				})
				console.error(error.message)
			}
		} 
		loadTodos()
		return () => {
			controller.abort()
			lastRequestId.current++
		}
	}, [])

  return {
    todos,
    apiState,

    addTodo,
    toggleTodo,
    toggleTodoPriority,
    deleteTask,
  }
}
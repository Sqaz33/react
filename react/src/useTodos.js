import { 
	useEffect, 
	useRef, 
	useState, 
	useReducer } from "react"
import { apiActionTypes } from "./apiReducer"
import {
  getTodos,
  postTodo,
  patchTodo,
  deleteTodo,
} from "./todoApi"
import { getNextPriority } from "./priority"
import {
  initialApiStatus,
  createApiReducer,
} from "./apiReducer"

// const initialTodos = [
// 	{ id: 3, title: 'Научиться работать со state', completed: false, details: { priority: "low" } },
// 	{ id: 2, title: 'Разобраться с props', completed: false, details: { priority: "normal" } },
// 	{ id: 1, title: 'Изучить JSX1234', completed: true, details: { priority: "high" } },
// ]

export default function useTodos() {
	const lastRequestId = useRef(0)	
	const [todos, setTodos] = useState([])
	const [mutationState, dispatchMutation] = useReducer(createApiReducer(true), initialApiStatus)
	const [loadState, dispatchLoad] = useReducer(createApiReducer(), initialApiStatus)

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
			dispatchMutation({
				type: apiActionTypes.started
			})
			const createdTodo = await postTodo(todoData)
			dispatchMutation({
				type: apiActionTypes.succeeded
			})
			setTodos(curTodos => [...curTodos, createdTodo])
		} catch (error) {
			dispatchMutation({
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
			dispatchMutation({
				type: apiActionTypes.started
			})
			const patchedTodo = await patchTodo(
				id,
				{completed: !curTodo.completed}
			)
			dispatchMutation({
				type: apiActionTypes.succeeded
			})
			setTodos(
				curTodos => curTodos.map(
					todo => todo.id === id ?
						patchedTodo :
						todo
			))
		} catch(error) {
			dispatchMutation({
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
			dispatchMutation({
				type: apiActionTypes.started
			})
			const patchedTodo = await patchTodo(
				id,
				{details: {priority: nextPriority}}
			)
			dispatchMutation({
				type: apiActionTypes.succeeded
			})
			setTodos(
				curTodos => curTodos.map(
					todo => todo.id === id ?
						patchedTodo :
						todo
			))
		} catch(error) {
			dispatchMutation({
				type: apiActionTypes.failed,
				payload: {
					message: error.message
				}
			})
			console.log(error.message)
		}
	}

	async function deleteTask(id, isExternalDispatch = false) {
		try {
			if (!isExternalDispatch) {
				dispatchMutation({
					type: apiActionTypes.started
				})
			}
			await deleteTodo(id)
			if (!isExternalDispatch) {
				dispatchMutation({
					type: apiActionTypes.succeeded
				})
			}
			setTodos(
				curTodos => curTodos.filter(todo => todo.id !== id)
			)
		} catch(error) {
			if (!isExternalDispatch) {
				dispatchMutation({
					type: apiActionTypes.failed,
					payload: {
						message: error.message
					}
				})
				console.log(error.message)
			} else {
				throw error
			}
		}
	}

	async function duplicateTodo(id) {
    const found = todos.find(todo => todo.id == id)
    const title = found.title + " (копия)"
    await addTodo(title, found.completed, found.details.priority)
  }

  async function clearCompletedTodos() { 
		try {
			dispatchMutation({
				type: apiActionTypes.started
			})
			const completed = todos
				.filter(todo => todo.completed)
				.map(todo => todo.id)
			for (const id of completed) {
				await deleteTask(id, true)
			}
			dispatchMutation({
				type: apiActionTypes.succeeded
			})
		} catch(error) {
			dispatchMutation({
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
			try {
				dispatchLoad({
					type: apiActionTypes.started
				})
				lastRequestId.current++
				const requestId = lastRequestId.current
				const todos = await getTodos({signal: controller.signal})
				if (lastRequestId.current !== requestId) {
					return
				}
				dispatchLoad({
					type: apiActionTypes.succeeded
				})
				setTodos(todos)
			} catch (error) {
				if (error.name === "AbortError") {
					return
				}
				dispatchLoad({
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
		}
	}, [])

  return {
    todos,
    loadState,
		mutationState,

    addTodo,
    toggleTodo,
    toggleTodoPriority,
    deleteTask,
		duplicateTodo,
		clearCompletedTodos
  }
}
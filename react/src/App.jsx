import TodoHeader from "./TodoHeader"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList";


function App() {
  const todos = [
    { id: 1, title: 'Изучить JSX', completed: true },
    { id: 2, title: 'Разобраться с props', completed: false },
    { id: 3, title: 'Научиться работать со state', completed: false },
  ];

  return (
    <main>
      <TodoHeader/>
      <TodoForm/>
      <TodoList todos={todos}/>
    </main>
  )
}

export default App

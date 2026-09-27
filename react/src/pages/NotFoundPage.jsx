import { Link } from "react-router";

function NotFoundPage() {
  return (
    <main className="todo-layout">
      <h1>Страница не найдена</h1>
      <Link to="/">Главная</Link>
    </main>
  )
}

export default NotFoundPage
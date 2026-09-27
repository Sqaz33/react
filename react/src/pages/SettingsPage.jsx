import { Link } from "react-router";

function SettingsPage() {
	return (
		<main className="todo-layout">
			<h1>Настройки</h1>
			<p>Настройки приложения</p>
			<Link to="/todos">Задачи</Link>
		</main>
	)
}

export default SettingsPage
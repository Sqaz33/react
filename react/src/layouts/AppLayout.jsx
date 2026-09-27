import { useCallback, useState, useMemo } from "react"
import { Outlet } from "react-router"
import { ThemeContext } from "../ThemeContext"
import useTodos from "../useTodos"
import TodoLayout from "../TodoLayout"
import { Link } from "react-router"

function AppLayout() {
  const todosPack = useTodos()
  const [theme, setTheme] = useState("light")
  const toggleTheme = useCallback(() => {
    setTheme(curTheme => curTheme === "light" ? "dark" : "light")
  }, [])
  const themeContextValue = useMemo(
    () => { return {theme, toggleTheme}},
    [theme, toggleTheme]
  )

  return (
    <ThemeContext value={themeContextValue}>
      <TodoLayout>
        <nav 
          aria-label="Основная навигация"
          className="todo-nav"
        >
          <Link to="/settings">Настройки</Link>
          <Link to="/todos">Задачи</Link>
        </nav>
        <Outlet context={todosPack}/>
      </TodoLayout>
    </ThemeContext>
  )
}


export default AppLayout
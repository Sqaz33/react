import { useCallback, useState, useMemo } from "react"
import { NavLink, Outlet } from "react-router"
import { ThemeContext } from "../ThemeContext"
import useTodos from "../useTodos"
import TodoLayout from "../TodoLayout"

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

  const navClass = ({isActive}) => {
    return isActive
      ? "todo-nav-link todo-nav-link--active"
      : "todo-nav-link"
  }

  return (
    <ThemeContext value={themeContextValue}>
      <TodoLayout>
        <nav 
          aria-label="Основная навигация"
          className="todo-nav"
        >

          <NavLink className={navClass} to="/settings" end>Настройки</NavLink>
          <NavLink className={navClass} to="/todos">Задачи</NavLink>
        </nav>
        <Outlet context={todosPack}/>
      </TodoLayout>
    </ThemeContext>
  )
}


export default AppLayout
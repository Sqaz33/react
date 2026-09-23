import { useTheme } from "./ThemeContext"

function TodoLayout({children}) {
  const {theme} = useTheme()

  return (
    <main
      className="todo-layout"
      data-theme={theme}
    >
      {children}
    </main>
  ) // children composition
}

export default TodoLayout

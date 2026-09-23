import { createContext, useContext } from "react"

export const ThemeContext = createContext(null)

export function useTheme() {
  const theme = useContext(ThemeContext)
  if (theme === null) {
      throw new Error("ThemeContext value is null")
  } 
  return theme
}
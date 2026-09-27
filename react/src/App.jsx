import { Navigate, Route, Routes } from "react-router"
import TodoPage from "./pages/TodoPage"
import SettingsPage from "./pages/SettingsPage"
import NotFoundPage from "./pages/NotFoundPage"
import AppLayout from "./layouts/AppLayout"
import TodoDetailsPage from "./pages/TodoDetailsPage"

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/todos" replace />} />
        <Route path="todos/:todoId" element={<TodoDetailsPage />} />
        <Route path="todos" element={<TodoPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App;
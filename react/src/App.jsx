import { Navigate, Route, Routes } from "react-router";
import TodoPage from "./pages/TodoPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todos" replace />} />
      <Route path="/todos" element={<TodoPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App;
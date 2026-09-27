import { useNavigate } from "react-router"

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <h1>Страница не найдена</h1>
      <p>Страницы с таким адресом не существует.</p>
      <button type="button" onClick={() => navigate(-1)}>Назад</button>
    </div>
  )
}

export default NotFoundPage
export function saveTodos(todos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.6) {
        reject(new Error("Проверочное исключение"))
        return
      }
      if (todos.length === 0) {
        reject(new Error("Нет задач для сохранения"))
        return
      }
      resolve({ savedCount: todos.length })
    }, 800)
  })
}

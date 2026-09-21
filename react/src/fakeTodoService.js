export function saveTodos(todos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (todos.length === 0) {
        reject(new Error("Нет задач для сохранения"))
        return
      }
      resolve({ savedCount: todos.length })
    }, 800)
  })
}

export function load(key, initialValue) {
  try {
    const saved = localStorage.getItem(key)
    if (saved === null) {
      return initialValue
    }
    const data = JSON.parse(saved)
    return data
  } catch (error) {
    console.log(error.message)
  }
  return initialValue
}

export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.log(error.message)
  }
}
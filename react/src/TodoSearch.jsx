function TodoSearch({searchText, onSearchTextChange}) {
  return (
    <div className="todo-search">
      <label htmlFor="search">Поиск</label>
      <input
        type="search" 
        id="search" 
        placeholder="Купить"
        value={searchText}
        onChange={event => onSearchTextChange(event.target.value)}
      />
    </div>
  )
}

export default TodoSearch

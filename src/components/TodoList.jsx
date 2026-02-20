import TodoItem from './TodoItem'

function TodoList({ todos, setTodos }) {
  if (todos.length === 0) {
    return (
      <div className="text-center text-muted my-3">
        No tasks found 🚀
      </div>
    )
  }

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </ul>
  )
}

export default TodoList
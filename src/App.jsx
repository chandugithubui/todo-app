import { useState, useEffect } from 'react'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

function App() {

  // Load Todos
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  const [filter, setFilter] = useState('all')

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  // Save todos
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Save dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  // Filtering
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const remainingCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.filter(todo => todo.completed).length

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #1e1e2f, #2c2c3e)"
          : "linear-gradient(135deg, #e3f2fd, #f8f9fa)",
        transition: "all 0.4s ease"
      }}
    >
      <div
        className={`card shadow-lg p-4 ${darkMode ? "bg-dark text-light" : ""}`}
        style={{
          width: "500px",
          borderRadius: "20px",
          transition: "all 0.4s ease"
        }}
      >

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold m-0">
            📝 My Todo App
          </h3>

          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Add Todo */}
        <AddTodo todos={todos} setTodos={setTodos} />

        {/* Filters */}
        <div className="btn-group w-100 my-3">
          <button
            className={`btn ${filter === 'all'
              ? darkMode ? "btn-light" : "btn-primary"
              : "btn-outline-secondary"}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>

          <button
            className={`btn ${filter === 'active'
              ? darkMode ? "btn-light" : "btn-success"
              : "btn-outline-secondary"}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>

          <button
            className={`btn ${filter === 'completed'
              ? darkMode ? "btn-light" : "btn-dark"
              : "btn-outline-secondary"}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        {/* List */}
        {filteredTodos.length === 0 ? (
          <div className="text-center text-muted my-3">
            🚀 No tasks found
          </div>
        ) : (
          <div style={{ transition: "all 0.3s ease-in-out" }}>
            <TodoList todos={filteredTodos} setTodos={setTodos} />
          </div>
        )}

        {/* Footer */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <small>
            {remainingCount} remaining | {completedCount} completed
          </small>

          {completedCount > 0 && (
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleClearCompleted}
            >
              Clear Completed
            </button>
          )}
        </div>

        <div className="text-center mt-3">
          <small className="opacity-75">
            Built with ❤️ using React & Bootstrap
          </small>
        </div>

      </div>
    </div>
  )
}

export default App
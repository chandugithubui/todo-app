import { useState } from 'react'

function TodoItem({ todo, todos, setTodos }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEditSave = () => {
    if (!editText.trim()) return

    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, text: editText } : t
    )

    setTodos(updatedTodos)
    setIsEditing(false)
  }

  const handleDelete = () => {
    const updatedTodos = todos.filter((t) => t.id !== todo.id)
    setTodos(updatedTodos)
  }

  const handleToggle = () => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    )
    setTodos(updatedTodos)
  }

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">

      {/* Left Section */}
      <div className="d-flex align-items-center gap-2 flex-grow-1">

        <input
          type="checkbox"
          className="form-check-input"
          checked={todo.completed}
          onChange={handleToggle}
        />

        {isEditing ? (
          <input
            type="text"
            className="form-control form-control-sm"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <span
            className={`ms-2 ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Right Section Buttons */}
      <div className="ms-3 d-flex gap-2">

        {isEditing ? (
          <button
            className="btn btn-sm btn-success"
            onClick={handleEditSave}
          >
            Save
          </button>
        ) : (
          <button
            className="btn btn-sm btn-warning"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}

        <button
          className="btn btn-sm btn-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

    </li>
  )
}

export default TodoItem
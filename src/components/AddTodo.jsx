import { useState } from 'react'

function AddTodo({ todos, setTodos }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!input.trim()) return

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false
    }

    setTodos([...todos, newTodo])
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
        <input
              type="text"
              className="form-control"
              placeholder="Enter a new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
               Add
          </button>
     </form>
  )
}

export default AddTodo
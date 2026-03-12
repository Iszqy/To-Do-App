import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn Electron.js', done: false },
    { id: 2, text: 'Build a desktop app', done: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'done'

  // Add a new todo
  const addTodo = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, done: false }]);
    setInputValue('');
  };

  // Toggle done/undone
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Handle Enter key in input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  // Filtered list
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;
    if (filter === 'done') return todo.done;
    return true;
  });

  const remaining = todos.filter(t => !t.done).length;

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">📝 My To-Do List</h1>

        {/* Input row */}
        <div className="input-row">
          <input
            className="todo-input"
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="add-btn" onClick={addTodo}>Add</button>
        </div>

        {/* Filter tabs */}
        <div className="filters">
          {['all', 'active', 'done'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo list */}
        <ul className="todo-list">
          {filteredTodos.length === 0 && (
            <li className="empty-state">No tasks here! 🎉</li>
          )}
          {filteredTodos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                className="checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
                title="Delete"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="footer">
          <span>{remaining} task{remaining !== 1 ? 's' : ''} remaining</span>
          {todos.some(t => t.done) && (
            <button
              className="clear-btn"
              onClick={() => setTodos(todos.filter(t => !t.done))}
            >
              Clear completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

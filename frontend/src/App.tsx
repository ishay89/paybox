import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [todos, setTodos] = useState<{ _id: string; title: string; description: string; dueDate: Date; done: boolean; }[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async (e : any) => {
    e.preventDefault();
    if (title === '' || description === '' || dueDate === '') {
      console.log(`must add title, description and dueDate`);
      alert(`must add title, description and dueDate`);
      return;
    }
    try {
      const response = await axios.post('/api/todos', {
        title,
        description,
        dueDate,
      });
      setTodos((prevTodos) => [...prevTodos, response.data.todo]);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id : string, updatedTodo: { title: string; description: string; dueDate: Date }) => {
    try {
      console.log(`updating todo: {id}`);
      await axios.put(`/api/todos/${id}`, updatedTodo);
      setTodos((prevTodos) =>
          prevTodos.map((todo) =>
              todo._id === id ? { ...todo, ...updatedTodo } : todo
          )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };


  const handleDeleteTodo = async (id : string) => {
    try {
      console.log(`deleting todo with id: {id}`)
      await axios.delete(`/api/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleDone = async (id: string) => {
    try {
      await axios.patch(`/api/todos/${id}`);
      setTodos((prevTodos) =>
          prevTodos.map((todo) =>
              todo._id === id ? { ...todo, done: !todo.done } : todo
          )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
      <div>
        <h1>Todo List</h1>
        <form onSubmit={handleAddTodo}>
          <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
          />
          <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
          />
          <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
          />
          <button type="submit">Add Item</button>
        </form>
        <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onToggleDone={handleToggleDone}
            onUpdate={handleUpdateTodo}/>
      </div>
  );
}

export default App;

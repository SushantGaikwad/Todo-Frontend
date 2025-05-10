import { useState } from 'react';
import TodoItem from './TodoItem';
import { createTodo } from '../utils/todoApis';
import toast from 'react-hot-toast';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onUpdate: () => void;
}

function TodoList({ todos, onUpdate }: TodoListProps) {
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending' as 'pending' | 'completed',
  });
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const handleCreate = async () => {
    try {
      await createTodo(newTodo);
      setNewTodo({ title: '', description: '', dueDate: '', status: 'pending' });
      onUpdate();
      toast.success('Todo created successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create todo');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    return todo.status === filter;
  });

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Create New Todo</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 mb-2"
        />
        <textarea
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 mb-2"
        />
        <input
          type="date"
          value={newTodo.dueDate}
          onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
          className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 mb-2"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-500"
        >
          Add Todo
        </button>
      </div>
      <div className="mb-4">
        <label className="mr-2 text-gray-700 dark:text-gray-300">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'completed')}
          className="p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onUpdate={onUpdate} />
      ))}
    </div>
  );
}

export default TodoList;
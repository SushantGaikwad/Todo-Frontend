import { useState } from 'react';
import { updateTodo, deleteTodo } from '../utils/todoApis';
import toast from 'react-hot-toast';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
}

function TodoItem({ todo, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate.split('T')[0],
    status: todo.status,
  });

  const handleUpdate = async () => {
    try {
      await updateTodo(todo._id, formData);
      setIsEditing(false);
      onUpdate();
      toast.success('Todo updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update todo');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo._id);
      onUpdate();
      toast.success('Todo deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete todo');
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700 mb-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 mb-2"
          />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 mb-2"
          />
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 mb-2"
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'completed' })}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 mb-2"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white p-2 rounded-md mr-2 hover:bg-green-700 dark:hover:bg-green-500"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{todo.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{todo.description}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Status: {todo.status}</p>
          <div className="mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white p-2 rounded-md mr-2 hover:bg-blue-700 dark:hover:bg-blue-500"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 dark:hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
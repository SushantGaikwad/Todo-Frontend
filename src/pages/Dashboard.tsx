import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';
import ThemeToggle from '../components/ThemeToggle';
import { logout } from '../utils/authApis';
import toast from 'react-hot-toast';
import { Todo } from '../types';
import { getTodos } from '../utils/todoApis';

function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch todos');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to logout');
    }
  };

  const accessToken = localStorage.getItem('accessToken')

  const fetchData = useCallback(()=> {
    fetchTodos();
  }, [accessToken]);

  useEffect(() => {
    if(accessToken)
    fetchData();
  }, [accessToken]);

  if (loading) return <div className="text-center mt-10 text-gray-800 dark:text-gray-200">Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center max-w-2xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Todo Dashboard</h1>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 dark:hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </div>
      <TodoList todos={todos} onUpdate={fetchTodos} />
    </div>
  );
}

export default Dashboard;
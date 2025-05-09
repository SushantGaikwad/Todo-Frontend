import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';
import { logout } from '../utils/authApis';
import toast from 'react-hot-toast';
import { type Todo } from '../types';
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
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to logout');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center max-w-2xl mx-auto mb-6">
        <h1 className="text-2xl font-bold">Todo Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <TodoList todos={todos} onUpdate={fetchTodos} />
    </div>
  );
}

export default Dashboard;
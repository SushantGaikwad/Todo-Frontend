import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (email: string, password: string) => Promise<void>;
}

function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (type === 'signup' && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await onSubmit(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700 mt-0">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        {type === 'login' ? 'Login' : 'Sign Up'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            required
          />
        </div>
        {type === 'signup' && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              required
            />
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 disabled:bg-blue-400"
        >
          {loading ? 'Loading...' : type === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        {type === 'login' ? (
          <>
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link to="/" className="text-blue-600 hover:underline dark:text-blue-400">
              Login
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

export default AuthForm;
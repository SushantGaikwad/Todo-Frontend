import AuthForm from '../components/AuthForm';
import { login } from '../utils/authApis';

function Login() {
  return <AuthForm type="login" onSubmit={login} />;
}

export default Login;
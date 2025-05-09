import AuthForm from '../components/AuthForm';
import { signup } from '../utils/authApis';

function Signup() {
  return <AuthForm type="signup" onSubmit={signup} />;
}

export default Signup;
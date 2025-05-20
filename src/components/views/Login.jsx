
import Navbar from './partials/Navbar.jsx';
import AuthForm from './partials/AuthForm.jsx';

const Login = () => {


  return (
    <div>
    <Navbar/>
    <AuthForm formType='login'/>
    </div>
  )
};

export default Login;
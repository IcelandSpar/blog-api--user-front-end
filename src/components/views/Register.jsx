import Navbar from './partials/Navbar.jsx';
import AuthForm from './partials/AuthForm.jsx';

const Register = () => {
  return (
    <div>
      <Navbar/>
      <AuthForm formType='register'/>
    </div>
  )
};

export default Register;
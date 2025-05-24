
import Navbar from './partials/Navbar.jsx';
import AuthForm from './partials/AuthForm.jsx';
import styles from '../../styles/Login.module.css';

const Login = () => {


  return (
    <div className={styles.loginPage}>
    <Navbar navStyle={styles.navStyle}/>
    <AuthForm formType='login' styles={styles}/>
    </div>
  )
};

export default Login;
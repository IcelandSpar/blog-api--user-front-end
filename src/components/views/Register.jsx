import Navbar from './partials/Navbar.jsx';
import AuthForm from './partials/AuthForm.jsx';
import styles from '../../styles/Register.module.css';

const Register = () => {
  return (
    <div className={styles.loginPage}>
      <Navbar navStyle={styles.navStyle}/>
      <AuthForm formType='register' styles={styles}/>
    </div>
  )
};

export default Register;
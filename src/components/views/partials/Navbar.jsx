import { Link } from 'react-router-dom';
import styles from '../../../styles/Navbar.module.css';

const Navbar = ({navStyle}) => {
  return (
    <header className={`${styles.headerNav} ${navStyle}`}>
      <nav className={styles.navbar}>
        <Link to='/'>Home</Link>
        <Link to='/blogs'>Blogs</Link>
        <Link to='/login'>Login</Link>
      </nav>
    </header>
  )
};


export default Navbar;
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../../../UserContext';

import styles from '../../../styles/Navbar.module.css';

const Navbar = ({navStyle}) => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <header className={`${styles.headerNav} ${navStyle}`}>
      <nav className={styles.navbar}>
        <Link to='/'>Home</Link>
        <Link to='/blogs'>Blogs</Link>
        {isLoggedIn ? <Link to='/logout'>Log Out</Link> : (<>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </>)}
        
        
        
      </nav>
    </header>
  )
};


export default Navbar;
import  { Link } from 'react-router-dom';

import Navbar from "./partials/Navbar";

import styles from '../../styles/Error.module.css';

const Error = () => {
  return (
    <>
    <Navbar navStyle={styles.navStyle}/>
    <div className={styles.errorPageCont}>
      <div className={styles.errorMsgContainer}>
        <p>This page does not exist...</p>
        <p>Go <Link to={'/'}>Home</Link>?</p>
      </div>
    </div>
    </>
  )
};

export default Error;
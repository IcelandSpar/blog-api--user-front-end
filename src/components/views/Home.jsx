import Navbar from './partials/Navbar';
import styles from '../../styles/Home.module.css';

const Home = () => {
  return (
    <div>
      <Navbar navStyle={styles.navStyle}/>
      <p>Hello world this is the home page !</p>
    </div>
  )
};

export default Home;
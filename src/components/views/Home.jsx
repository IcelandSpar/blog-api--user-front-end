import Navbar from './partials/Navbar';
import styles from '../../styles/Home.module.css';

import workBlog from '../../assets/work_blog.png';

const Home = () => {
  return (
    <div className={styles.homePage}>
      <Navbar navStyle={styles.navStyle}/>
      <main className={styles.homeMainCont}>
        <section className={styles.imgParaCont}>
          {/* Image by <a href="https://pixabay.com/users/arivleone-14275976/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4997565">Arivle One</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4997565">Pixabay</a> */}
          <img className={styles.firstContImg} src={workBlog} alt="bloggers" width='200px'/>
          <p>Read blogs from our authors!</p>
        </section>
      </main>
    </div>
  )
};

export default Home;
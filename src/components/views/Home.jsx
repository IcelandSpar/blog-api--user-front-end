import Navbar from './partials/Navbar';
import styles from '../../styles/Home.module.css';

import frontPageBlogWord from '../../assets/blog-front-page-word.png';
import workBlog from '../../assets/work_blog.png';
import blogBookImg from '../../assets/blog-book.png';

const Home = () => {
  return (
    <div className={styles.homePage}>
      <Navbar navStyle={styles.navStyle}/>
      <main className={styles.homeMainCont}>
      {/* Image by <a href="https://pixabay.com/users/thedigitalartist-202249/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1186513">Pete Linforth</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1186513">Pixabay</a> */}
        <section className={styles.homeFrontPageSect}>
          <img className={styles.frontPageImg} src={frontPageBlogWord} alt="front page blog" width='100%'/>

          {/* <img className={styles.frontPageImg} src={frontPageBlogImg} alt="front page blog" width='100%'/> */}
        {/* Image by <a href="https://pixabay.com/users/riona_craft_and_renovatio-939290/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2151307">riona_craft_and_renovatio</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2151307">Pixabay</a> */}
        </section>
        <section className={styles.imgParaCont}>
        {/* Image by <a href="https://pixabay.com/users/megan_rexazin_conde-6742250/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5000692">Megan Rexazin Conde</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5000692">Pixabay</a> */}
          <p>Read blogs from billions of auhors!</p>
          <img className={styles.firstContImg} src={blogBookImg} alt="blog book" width='200px'/>

        </section>
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
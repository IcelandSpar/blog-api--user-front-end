import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "./partials/Navbar";

import styles from '../../styles/Authors.module.css';

import blogProfile from '../../assets/blog_profile.png';

const Authors = () => {
  const [ author, setAuthor ] = useState(null);
  const [ loadingAuthor, setLoadingAuthor ] = useState(true);
  const { authorId } = useParams();

  useEffect(() => {
    setLoadingAuthor(true);

    fetch(`http://localhost:3000/author/about/${authorId}`)
    .then((res) => res.json())
    .then((res) => setAuthor((prev) => res))
    .catch((err) => console.error(err))
    .finally(() => setLoadingAuthor(false));
  }, [authorId])
  
  return (
    <div className={styles.authorPage}>
      <Navbar navStyle={styles.navStyle}/>
      <main className={styles.authorMainCont}>
      <img src={blogProfile} alt="Author Profile Picture" width='300px' height='300px'/>
      {/* Image by <a href="https://pixabay.com/users/mohamed_hassan-5229782/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3596548">Mohamed Hassan</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3596548">Pixabay</a> */}
      {loadingAuthor == true ? 'Loading Author info...' : (
        <section className={styles.authorInfoCont}>
          <h1 className={styles.authorUserHeading}>{author.user.username}</h1>
          <p className={styles.authorBio}>{author.bio}</p>
        </section>
      )}
      </main>

    </div>
  )
};

export default Authors;
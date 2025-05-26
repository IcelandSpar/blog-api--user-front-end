import {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatRelative } from 'date-fns';

import Navbar from './partials/Navbar';

import likesIcon from '../../assets/thumb_up.svg';

import styles from '../../styles/Blogs.module.css'

const Blogs = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {

    setLoading(true);

      fetch("http://localhost:3000/blogs/preview", { mode: "cors"})
      .then((response) => response.json())
      .then((response) => setBlogs(response))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

  }, []);


  if(error) {
    return (
      <div>
       <Navbar/>
        <p>Something went wrong : (</p>
      </div>
    )
  }


  return (
    <div className={styles.blogsPage}>
    <Navbar  navStyle={styles.blogsNavBar}/>
      <main className={styles.blogsMainCont}>
        <h1>Blogs: </h1>
        <ul className={styles.blogsUl}>
          {loading ? <p>Blogs are loading in...</p> : null}
          {
            
          !blogs ? null : blogs.map((blog) => {

            return (
              <li key={blog.id} className={styles.blogListItemCont}>
                <Link to={'/blogs/' + blog.id}><h2>{blog.title}</h2></Link>
                <p>By: <Link to={`/authors/${blog.authorId}`}>{blog.author.user.username}</Link>
                </p>
                <p>Created: {formatRelative(blog.createdAt, new Date())}</p>
                <p>Last Modified: {formatRelative(blog.modifiedAt, new Date())}</p>
                <div className={styles.likesCont}>
                  <img className={styles.likesIcon} src={likesIcon} alt="likes" />
                  <p>{blog._count.UsersLikedBlogs}</p>
                </div>
              </li>
            )
          })
          }
        </ul>
      </main>
    </div>
  );
};

export default Blogs;
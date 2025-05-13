import {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Navbar from './partials/Navbar';

import styles from '../../styles/Blogs.module.css'

const Blogs = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {

    setLoading(true);

      fetch("http://localhost:3000/blogs", { mode: "cors"})
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
          {blogs.map((blog) => {

            return (
              <li key={blog.id}>
                <h2>{blog.title}</h2>
                <p>{blog.content}</p>
                <p>{blog.createdAt}</p>
              </li>
            )
          })}
        </ul>
        <button onClick={() => {
          return setCount((prevState) => prevState + 1);
        }}>Count {count}</button>
      </main>
    </div>
  );
};

export default Blogs;
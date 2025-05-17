import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatRelative } from 'date-fns'

import Navbar from './partials/Navbar.jsx';
import Comment from './partials/Comment.jsx';
import CommentForm from './partials/CommentForm.jsx';

import styles from '../../styles/Blog.module.css'

const Blog = () => {

  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState(null);
  const [commentErr, setCommentErr] = useState(null);
  const [loadingComments, setLoadingComments] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingCommentForm, setLoadingCommentForm] = useState(true);
  const [loadingCommentFormErr, setLoadingCommentFormErr] = useState(null);



  const { blogId } = useParams();
  useEffect(() => {
    setLoading(true);
    setLoadingComments(true);
    setLoadingCommentForm(true);
    const token = localStorage.getItem('token');



    fetch(`http://localhost:3000/blogs/${blogId}`)
    .then((response) => response.json())
    .then((response) => setBlog(response))
    .catch((error) => setError(error))
    .finally(() => setLoading(false));

    fetch(`http://localhost:3000/login/check-if-auth`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((res) => setIsLoggedIn(res.isAuth))
    .catch((err) => {
      setIsLoggedIn(false);
      setLoadingCommentFormErr(err);
    })
    .finally(() => setLoadingCommentForm(false))


    fetch(`http://localhost:3000/comments/${blogId}`)
    .then((res) => res.json())
    .then((res) => setComments(res))
    .catch((err) => setCommentErr(err))
    .finally(() => setLoadingComments(false));

  },[blogId]);

  if(error) {
    return(
      <p>Something went wrong...</p>
    );
  }

  console.log(blog)
  return (
    <div className={styles.blogPage}>
      <Navbar navStyle={styles.navStyle}/>
      <main className={styles.blogsMainCont}>
        {loading ? <p>Blog Loading...</p> : null }
      {!blog ? null : (
          <div className={styles.blogContent}>
            <h1 className={styles.blogTitle}>{blog.title}</h1>
            <p>Written By: <Link to={`/authors/${blog.authorId}`}>{blog.author.user.username}</Link></p>
            <p>{blog.content}</p>
            <p>Created: {formatRelative(blog.createdAt, new Date())}</p>
            <p>Last Modified: {formatRelative(blog.modifiedAt, new Date())}</p>
          </div>
      )}
      
        {isLoggedIn ? <CommentForm/> : (
          <div className={styles.mustBeLoggedInMsg}>
            <p>You must be <Link to={'/login'}>logged in</Link> to make a comment.</p>
            <p>Not a user yet? Create an account!</p>
          </div>
        )} 
        <section>
          <h2 className={styles.commentHeading}>Comments</h2>
          {loadingComments == false && comments.length <= 0 ? (
            <p>Looks like there are no comments...</p>
          ) : null}
        {loadingComments == true ? (
          <p>Loading Comments...</p>
        ) : (
          <ul className={styles.BlogUl}>
            {comments.map((comment) => <Comment key={comment.id} comment={comment} blogAuthor={blog.author.user.username}/>)}
          </ul>
        )}
        </section>
      </main>      
    </div>
  )
};

export default Blog;
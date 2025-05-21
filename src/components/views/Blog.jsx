import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatRelative } from 'date-fns'

import UserContext from '../../UserContext.jsx';

import Navbar from './partials/Navbar.jsx';
import Comments from './partials/Comments.jsx';
import Comment from './partials/Comment.jsx';
import CommentForm from './partials/CommentForm.jsx';

import styles from '../../styles/Blog.module.css';
import thumbUp from '../../assets/thumb_up.svg';
import thumbDown from '../../assets/thumb_down.svg';

const Blog = () => {
  const timerInstance = useRef({timer: 0});
  const { isLoggedIn, LoadingCommentForm } = useContext(UserContext);

  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState(null);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentErr, setCommentErr] = useState(null);

  const [ userLikeStatus, setUserLikeStatus ] = useState(null);
  const [ like, setLike ] = useState(null);
  const [ dislike, setDislike ] = useState(null);


  const token = localStorage.getItem('token');

  const  sendCurrentLike = (currentState) => {
    clearTimeout(timerInstance.current.timer);
    timerInstance.current.timer = setTimeout(() => {
      if(currentState != null) {
        fetch(`http://localhost:3000/blogs/like-blog/${blogId}/${currentState}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      } else if (currentState == null) {
        fetch(`http://localhost:3000/blogs/delete-like-blog/${blogId}/${currentState}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      }


    }, 3000)
  }

  const handleLike = (e) => {
    let currentState = null;
    e.preventDefault();
    if(userLikeStatus == true) {
      setLike((prev) => prev - 1);
      setUserLikeStatus(() => null)
      currentState = null;
    } else if(userLikeStatus == null) {
      setLike((prev) => prev + 1);
      setUserLikeStatus(() => true)
      currentState = true;
    } else if (userLikeStatus == false) {
      setUserLikeStatus(() => true);
      setLike((prev) => prev + 1);
      setDislike((prev) => prev - 1);
      currentState = true;
    }
   sendCurrentLike(currentState)
  };

  const handleDislike = (e) => {
    e.preventDefault();
    let currentState = null;
    if(userLikeStatus == false) {
      setDislike((prev) => prev - 1);
      setUserLikeStatus(() => null)
      currentState = null;
    } else if(userLikeStatus == null) {
      setDislike((prev) => prev + 1);
      setUserLikeStatus(() => false);
      currentState = false;
    } else if (userLikeStatus == true) {
      setUserLikeStatus(() => false);
      setLike((prev) => prev - 1);
      setDislike((prev) => prev + 1);
      currentState = false;
    }
    sendCurrentLike(currentState)
  }


  let { blogId } = useParams();
  useEffect(() => {
    setLoading(true);
    setLoadingComments(true);


    fetch(`http://localhost:3000/blogs/${blogId}`)
    .then((response) => response.json())
    .then((response) => {
      setBlog(response);
      setLike(response._count.UsersLikedBlogs);
      setDislike(response.dislikes);
    })
    .catch((error) => setError(error))
    .finally(() => setLoading(false));

    if(isLoggedIn) {
      fetch(`http://localhost:3000/blogs/${blogId}/check-user-like`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => res.json())
      .then((res) => {
        if(res) {
          setUserLikeStatus(res.like)
        }
      })
      .catch((err) => console.error(err));
    }

    fetch(`http://localhost:3000/comments/${blogId}`)
    .then((res) => res.json())
    .then((res) => setComments(() => res))
    .catch((err) => setCommentErr(() => err))
    .finally(() => setLoadingComments(() => false));

  },[blogId, token, isLoggedIn]);

  if(error) {
    return(
      <p>Something went wrong...</p>
    );
  }

  return (
    <div className={styles.blogPage}>
      <Navbar navStyle={styles.navStyle}/>
      <main className={styles.blogsMainCont}>
        {loading ? <p>Blog Loading...</p> : null }
      {blog == null ? null : (
          <div className={styles.blogContent}>
            <h1 className={styles.blogTitle}>{blog.title}</h1>
            <p>Written By: <Link to={`/authors/${blog.authorId}`}>{blog.author.user.username}</Link></p>
            <p>{blog.content}</p>
            <p>Created: {formatRelative(blog.createdAt, new Date())}</p>
            <p>Last Modified: {formatRelative(blog.modifiedAt, new Date())}</p>
            {!isLoggedIn ? null : (
            <div className={styles.blogLikeDislikeBtnCont}>
              <button onClick={handleLike} className={userLikeStatus == true ? styles.activeLike : styles.notActive} type='button'><img src={thumbUp} alt="like" className={userLikeStatus == true ? styles.activeSvg : styles.notActive}/> Like {like}</button>
              <button onClick={handleDislike} className={userLikeStatus == false ? styles.activeDislike : styles.notActive} type='button'><img src={thumbDown} alt="dislike"  className={userLikeStatus == false ? styles.activeSvg : styles.notActive}/> Dislike {dislike}</button>
            </div>
            )}
          </div>
      )}
      
        {isLoggedIn ? <CommentForm setComments={setComments} setCommentErr={setCommentErr} setLoadingComments={setLoadingComments}/> : (
          <div className={styles.mustBeLoggedInMsg}>
            <p>You must be <Link to={'/login'}>logged in</Link> to make a comment.</p>
            <p>Not a user yet? <Link to={'/register'}>Create an account!</Link></p>
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
          <Comments commentErr={commentErr} blog={blog} blogId={blogId} setLoadingComments={setLoadingComments} comments={comments} setComments={setComments} setCommentErr={setCommentErr} stylesComments={styles}/>
        )}
        </section>
      </main>      
    </div>
  )
};

export default Blog;
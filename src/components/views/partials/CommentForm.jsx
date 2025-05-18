import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import styles from '../../../styles/CommentForm.module.css';

const CommentForm = () => {

  const commentTitleRef = useRef(null);
  const commentContentRef = useRef(null);

  const { blogId } = useParams();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('title', commentTitleRef.current.value);
    formData.append('comment', commentContentRef.current.value);
    formData.append('blogId', blogId);

    const jwtToken = localStorage.getItem('token');


      await fetch('http://localhost:3000/comments/post-comment', {
        method: 'POST',
        body: new URLSearchParams(formData),
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        window.location.reload();
      })




    

  };


  return (
    <form>
      <fieldset className={styles.commentFormFieldset}>
        <legend>Send a Comment</legend>
        <div className={styles.labelAndInputCont}>
          <label htmlFor="commentTitle">Comment Title: </label>
          <input ref={commentTitleRef} type="text" id="commentTitle" name="commentTitle" />
        </div>

        <div className={styles.labelAndInputCont}>
          <label htmlFor="commentContent">Comment: </label>
          <textarea ref={commentContentRef} name="commentContent" id="commentContent"></textarea>
        </div>
        <button onClick={ handleCommentSubmit } className={styles.sendCommentBtn}>Send Comment</button>

      </fieldset>

    </form>
  )
};

export default CommentForm;
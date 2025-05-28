import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styles from '../../../styles/CommentForm.module.css';

import sendIcon from '../../../assets/send.png'

const CommentForm = () => {

  const commentTitleRef = useRef(null);
  const commentContentRef = useRef(null);

  const navigate = useNavigate();

  const { blogId } = useParams();

  const redirect = () => {
    navigate(0);
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if(commentTitleRef.current.value != '' || commentContentRef.current.value != '') {
    const formData = new FormData();
    formData.append('title', commentTitleRef.current.value);
    formData.append('comment', commentContentRef.current.value);
    formData.append('blogId', blogId);

    const jwtToken = localStorage.getItem('token');

    setTimeout(() => {
      redirect();
    }, 1000)

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
    } 
  };


  return (
    <form>
      <fieldset className={styles.commentFormFieldset}>
        <legend className={styles.fieldsetLegend}>Send a Comment</legend>
        <div className={styles.labelAndInputCont}>
          <label htmlFor="commentTitle">Comment Title: </label>
          <input ref={commentTitleRef} className={styles.commentTitleInput} type="text" id="commentTitle" name="commentTitle" required/>
        </div>

        <div className={styles.labelAndInputCont}>
          <label htmlFor="commentContent">Comment: </label>
          <textarea ref={commentContentRef} className={styles.commentContentTextArea} name="commentContent" id="commentContent" required></textarea>
        </div>
        <button onClick={ handleCommentSubmit } className={styles.sendCommentBtn}><p className={styles.sendCommentTxt}>Send</p><img src={sendIcon} className={styles.commentFormBtnIcon} alt="send comment" width='30px' height='30px'/></button>
        {/* <a href="https://www.flaticon.com/free-icons/send" title="send icons">Send icons created by Freepik - Flaticon</a> */}
      </fieldset>

    </form>
  )
};

export default CommentForm;
import styles from '../../../styles/CommentForm.module.css';

const CommentForm = () => {
  return (
    <form action="/comments">
      <fieldset className={styles.commentFormFieldset}>
        <legend>Send a Comment</legend>
        <div className={styles.labelAndInputCont}>
          <label htmlFor="commentTitle">Comment Title: </label>
          <input type="text" id="commentTitle" name="commentTitle" />
        </div>

        <div className={styles.labelAndInputCont}>
          <label htmlFor="commentContent">Comment: </label>
          <textarea name="commentContent" id="commentContent"></textarea>
        </div>
        <button className={styles.sendCommentBtn}>Send Comment</button>

      </fieldset>

    </form>
  )
};

export default CommentForm;
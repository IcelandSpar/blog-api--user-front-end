import styles from '../../../styles/Comments.module.css';
import { formatRelative } from 'date-fns';

import bookmarkHeart from '../../../assets/bookmark_heart.svg';


const Comment = ({comment, blogAuthor}) => {
  return (
    <li className={styles.listItemCont}>
      <div className={styles.commentTitleUserHeartCont}>
        <h3 className={styles.commentHeader}>{comment.commentTitle}</h3>
        <div className={styles.commenUserAndHeartCont}>
          <p className={styles.commentUser}>{comment.user.username}</p>
          {!comment.authorHeart ? null : (
            <div className={styles.authorHeartAndIconCont}>
              <img className={styles.bookmarkHeartIcon} src={bookmarkHeart} alt="author hearted" />
              <p className={styles.commentAuthorHeart}>{`${blogAuthor} loved!`}</p>
            </div>
          )}

        </div>
      </div>
      <p>{comment.comment}</p>
      <p>Upvotes: {comment.likes}</p>
      <p>Downvotes: {comment.dislikes}</p>
      <p>Posted: {formatRelative(comment.createdAt, new Date())}</p>
      <p>Edited: {formatRelative(comment.modifiedAt, new Date())}</p>
    </li>
  )
};

export default Comment;
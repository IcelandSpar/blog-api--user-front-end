import styles from '../../../styles/Comments.module.css';
import { formatRelative } from 'date-fns';

import bookmarkHeart from '../../../assets/bookmark_heart.svg';
import likeIcon from '../../../assets/thumb_up.svg';
import dislikeIcon from '../../../assets/thumb_down.svg';


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
      <div className={styles.postedAndLikeCont}>
        <div className={styles.postedTimeStamps}>
          <p>Posted: {formatRelative(comment.createdAt, new Date())}</p>
          {formatRelative(comment.createdAt, new Date()) == formatRelative(comment.modifiedAt, new Date()) ? null :           <p>Edited: {formatRelative(comment.modifiedAt, new Date())}</p>
        }
        </div>
        <div className={styles.commentLikeAndDislikeCont}>
          <div className={styles.likeAndParaCont}>
            <img className={styles.likeIcon} src={likeIcon} alt="like" />
            <p>{comment.likes}</p>
          </div>
          <div className={styles.likeAndParaCont}>
            <img className={styles.likeIcon} src={dislikeIcon} alt="dislike" />
            <p>{comment.dislikes}</p>
          </div>
        </div>
      </div>
    </li>
  )
};

export default Comment;
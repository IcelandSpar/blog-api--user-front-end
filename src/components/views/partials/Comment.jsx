import { useContext } from 'react';

import styles from '../../../styles/Comments.module.css';
import { formatRelative } from 'date-fns';

import bookmarkHeart from '../../../assets/bookmark_heart.svg';
import likeIcon from '../../../assets/thumb_up.svg';
import dislikeIcon from '../../../assets/thumb_down.svg';
import UserContext from '../../../UserContext';


const Comment = ({comment, blogAuthor}) => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <li className={styles.listItemCont}>
      <div className={styles.commentTitleUserHeartCont}>
        <h3 className={styles.commentHeader}>{comment.commentTitle}</h3>
        <div className={styles.commenUserAndHeartCont}>
          <p className={styles.commentUser}>{comment.user.username}</p>
          {!(comment.authorHeartedComments.length > 0) ? null : (
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
          <button className={styles.likeAndParaBtn}>
            <img className={styles.likeIcon} src={likeIcon} alt="like" />
            <p>{comment.UserLikedComments.length}</p>
          </button>
          <button className={styles.likeAndParaBtn}>
            <img className={styles.likeIcon} src={dislikeIcon} alt="dislike" />
            <p>{comment._count.UserLikedComments}</p>
          </button>
        </div>
      </div>
    </li>
  )
};

export default Comment;
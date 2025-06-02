import { useState, useContext } from 'react';

import styles from '../../../styles/Comments.module.css';
import { formatRelative } from 'date-fns';

import bookmarkHeart from '../../../assets/bookmark_heart.svg';
import likeIcon from '../../../assets/thumb_up.svg';
import dislikeIcon from '../../../assets/thumb_down.svg';
import UserContext from '../../../UserContext';


const Comment = ({comment, blogAuthor}) => {
  const { isLoggedIn } = useContext(UserContext);
  const [ like, setLike ] = useState(comment.UserLikedComments.length);
  const [ dislike, setDislike ] = useState(comment._count.UserLikedComments);
  const [ userCurrentLikeStatus, setUserCurrentLikeStatus ] = useState(null);

  const handleLike = (e) => {
    e.preventDefault();
    if(isLoggedIn) {
      if(userCurrentLikeStatus == null) {
        setLike((prev) => prev + 1)
        setUserCurrentLikeStatus(true);
      } else if(userCurrentLikeStatus == false) {
        setDislike((prev) => prev - 1)
        setLike((prev) => prev + 1);
        setUserCurrentLikeStatus(true);
      } else if (userCurrentLikeStatus == true) {
        setLike((prev) => prev - 1);
        setUserCurrentLikeStatus(null);
      }
    }

  };

  const handleDislike = (e) => {
    e.preventDefault();
    if(isLoggedIn) {
      if(userCurrentLikeStatus == null) {
        setDislike((prev) => prev + 1);
        setUserCurrentLikeStatus(false);
      } else if (userCurrentLikeStatus == true) {
        setLike((prev) => prev - 1);
        setDislike((prev) => prev + 1);
        setUserCurrentLikeStatus(false);
      } else if (userCurrentLikeStatus == false) {
        setDislike((prev) => prev - 1);
        setUserCurrentLikeStatus(null);
      }
    }
  };

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
          {formatRelative(comment.createdAt, new Date()) == formatRelative(comment.modifiedAt, new Date()) ? null : <p>Edited: {formatRelative(comment.modifiedAt, new Date())}</p>
        }
        </div>
        <div className={styles.commentLikeAndDislikeCont}>
          <button onClick={handleLike} type='button' className={`${styles.likeAndParaBtn} ${userCurrentLikeStatus == true ? styles.activeCommentLike : null}`}>
            <img className={styles.likeIcon} src={likeIcon} alt="like" />
            <p>{like}</p>
          </button>
          <button onClick={handleDislike} type='button' className={`${styles.likeAndParaBtn} ${userCurrentLikeStatus == false ? styles.activeCommentLike : null}`}>
            <img className={styles.likeIcon} src={dislikeIcon} alt="dislike" />
            <p>{dislike}</p>
          </button>
        </div>
      </div>
    </li>
  )
};

export default Comment;
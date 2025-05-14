import styles from '../../../styles/Comments.module.css';
import { formatRelative } from 'date-fns'


const Comment = ({comment, blogAuthor}) => {
  return (
    <li>
      <p>{comment.user.username}</p>
      <p>{comment.authorHeart ? `${blogAuthor} loved this Comment` : null}</p>
      <h3>{comment.commentTitle}</h3>
      <p>{comment.comment}</p>
      <p>Upvotes: {comment.likes}</p>
      <p>Downvotes: {comment.dislikes}</p>
      <p>Posted: {formatRelative(comment.createdAt, new Date())}</p>
      <p>Edited: {formatRelative(comment.modifiedAt, new Date())}</p>
    </li>
  )
};

export default Comment;
import Comment from './Comment.jsx';

const Comments = ({stylesComments, comments, blog}) => {

  if(blog != null) {
    return (
      <ul className={stylesComments.BlogUl}>
      {comments.map((comment) => <Comment key={comment.id} comment={comment} blogAuthor={blog.author.user.username}/>)}
    </ul>
    )
  }


};

export default Comments;
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatRelative } from 'date-fns'

import Navbar from './partials/Navbar.jsx';

const Blog = () => {

  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { blogId } = useParams();
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/blogs/${blogId}`)
    .then((response) => response.json())
    .then((response) => setBlog(response))
    .catch((error) => setError(error))
    .finally(() => setLoading(false));
  },[blogId]);

  if(error) {
    return(
      <p>Something went wrong...</p>
    );
  }


  return (
    <div>
      <Navbar/>
      <main>
        {loading ? <p>Blog Loading...</p> : null }
      {!blog ? null : (
          <div>
            <h1>{blog.title}</h1>
            <Link to={`/authors/${blog.authorId}`}>{blog.author.user.username}</Link>
            <p>{blog.content}</p>
            <p>Created: {formatRelative(blog.createdAt, new Date())}</p>
            <p>Last Modified: {formatRelative(blog.modifiedAt, new Date())}</p>
          </div>
      )}
      </main>      
    </div>
  )
};

export default Blog;
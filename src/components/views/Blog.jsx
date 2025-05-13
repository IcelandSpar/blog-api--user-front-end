import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

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
  },[blogId])


  return (
    <div>
      <Navbar/>
      <main>
        {loading ? <p>Blog Loading...</p> : null }
      {!blog ? null : (
          <div>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
          </div>
      )}
      </main>      
    </div>
  )
};

export default Blog;
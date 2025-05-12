import {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/blogs", { mode: "cors"})
    .then((response) => response.json())
    .then((response) => setBlogs(response))
    .catch((err) => setError(err))
  }, []);

  if(error) {
    return (
      <div>
        Something went wrong : (
      </div>
    )
  }


  return (
    <div>
      <p>Hello world</p>
      <ul>
        {console.log(blogs)
        }
        {blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <h1>{blog.title}</h1>
              <p>{blog.content}</p>
            </li>
          )
        })}
      </ul>
      <Link to="/">Home</Link>
      <button onClick={() => {
          

        return setCount((prevState) => prevState + 1);
      }}>Count {count}</button>
    </div>
  );
};

export default Blogs;
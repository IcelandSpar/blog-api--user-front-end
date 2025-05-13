import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Blogs from './components/views/Blogs.jsx';
import Home from './components/views/Home.jsx';
import Blog from './components/views/Blog.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/blogs',
    element: <Blogs/>,
  },
  {
    path: '/blogs/:blogId',
    element: <Blog/>,
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'

import Home from './components/views/Home.jsx';
import Blogs from './components/views/Blogs.jsx';
import Login from './components/views/Login.jsx';
import Logout from './components/views/Logout.jsx';

import Blog from './components/views/Blog.jsx';
import Authors from './components/views/Authors.jsx';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/blogs',
    element: <Blogs/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/logout',
    element: <Logout/>
  },
  {
    path: '/blogs/:blogId',
    element: <Blog/>,
  },
  {
    path: '/authors/:authorId',
    element: <Authors/>,
  },

]);

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <App />
  </StrictMode>,
)

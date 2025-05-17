import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { router } from './main.jsx'

import UserContext from './UserContext.jsx';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingCommentForm, setLoadingCommentForm] = useState(true);
  const [loadingCommentFormErr, setLoadingCommentFormErr] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:3000/login/check-if-auth`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((res) => setIsLoggedIn(res.isAuth))
    .catch((err) => {
      setIsLoggedIn(false);
      setLoadingCommentFormErr(err);
    })
    .finally(() => setLoadingCommentForm(false))
  }, [])


  return (
    <>
    
      <UserContext.Provider value={{isLoggedIn, loadingCommentForm, loadingCommentFormErr, setIsLoggedIn}}>
        <RouterProvider router={router}/>
      </UserContext.Provider>
    </>
  )
}

export default App

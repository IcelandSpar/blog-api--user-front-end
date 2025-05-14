import { useRef, useState } from 'react';

import Navbar from './partials/Navbar.jsx';

const Login = () => {
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [jwt, setJwt] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', usernameInputRef.current.value);
    formData.append('password', passwordInputRef.current.value);


    
    await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: new URLSearchParams(formData),


    })
    .then((res) => res.json())
    .then((res) => {
      setJwt(res.token);
      localStorage.setItem('token', res.token);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      if(localStorage.getItem('token') != 'undefined') {
        window.location = "http://localhost:5173/"
      }
    });

  };

  return (
    <div>
      <Navbar/>
      <form>
        <fieldset>
          <legend>Login</legend>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" name="username" ref={usernameInputRef}/>
          </div>

          <div>
            <label htmlFor="password">Pasword: </label>
            <input type="password" id="password" name="password" ref={passwordInputRef}/>
          </div>
          <button onClick={handleLogin}>Login</button>
        </fieldset>
      </form>
    </div>
  )
};

export default Login;
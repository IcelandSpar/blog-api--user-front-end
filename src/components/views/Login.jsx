import { useRef, useState } from 'react';

import Navbar from './partials/Navbar.jsx';

const Login = () => {
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [jwt, setJwt] = useState(null);
  const [loginErr, setLoginErr] = useState(false);

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

            
      if(res.ok == undefined) {
        setLoginErr(true);
      }
      setJwt(res.token);
      localStorage.setItem('token', res.token);
    })
    .catch((err) => {


      console.error(err)
    })
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
          {!loginErr ? null : (
            <div>
              <p>Username and password combination is incorrect. Please try again.</p>
            </div>
          )}
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
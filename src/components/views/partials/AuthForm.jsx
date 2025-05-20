import { useRef, useState } from 'react';

const AuthForm = ({formType}) => {
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [loginErr, setLoginErr] = useState(false);
  const [registerErr, setRegisterErr] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', usernameInputRef.current.value);
    formData.append('password', passwordInputRef.current.value);


    
    await fetch(`http://localhost:3000/${formType}`, {
      method: 'POST',
      body: new URLSearchParams(formData),


    })
    .then((res) => {
      if(!res.ok && formType == 'login') {
        setLoginErr(true);
      } else if(!res.ok && formType == 'register') {
        setRegisterErr(true);
      } else if(res.ok) {
        setRegisterErr(false);
        setLoginErr(false);
      }
      return res.json()})
    .then((res) => {
      
      if(formType == 'login') {
        if(res.token == undefined) {
          setLoginErr(true);
        } else {
          localStorage.setItem('token', res.token);
        }
      }
            

    })
    .catch((err) => {


      console.error(err)
    })
    .finally(() => {
      if(localStorage.getItem('token') != undefined && formType == 'login') {
        window.location = "http://localhost:5173/"
      } if(formType == 'register' && registerErr == true) {
        window.location = 'http://localhost:5173/login';
      } else if(formType == 'register' && registerErr == false) {
        return null

      }
    });

  };


  return (
    <form>

    <fieldset>
      <legend>{formType[0].toUpperCase() + formType.slice(1)}</legend>
      {!registerErr ? null : (
        <div>
          <p>Username already exists, please try again.</p>
        </div>
      )}
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
      <button onClick={handleLogin}>{formType[0].toUpperCase() + formType.slice(1)}</button>
    </fieldset>
  </form>
  )
};

export default AuthForm;
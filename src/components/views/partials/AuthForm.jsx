import { useRef, useState } from 'react';

const AuthForm = ({formType, styles}) => {
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [loginErr, setLoginErr] = useState(false);
  const [registerErr, setRegisterErr] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    let isThereLoginErr = false;
    const formData = new FormData();
    formData.append('username', usernameInputRef.current.value);
    formData.append('password', passwordInputRef.current.value);

    await fetch(`http://localhost:3000/${formType}`, {
      method: 'POST',
      body: new URLSearchParams(formData),
    })
    .then((res) => {
      if(!res.ok && formType == 'login') {
        isThereLoginErr = true;
        setLoginErr(true);
      } else if(!res.ok && formType == 'register') {
        setRegisterErr(true);
      } else if(res.ok) {
        setRegisterErr(false);
        setLoginErr(false);
        isThereLoginErr = false
      }
      return res.json()})
    .then((res) => {
      
      if(formType == 'login') {
        if(res.token == undefined) {
          isThereLoginErr = true
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
      if(isThereLoginErr == true) {
        return null
      } else {
        if(localStorage.getItem('token') != undefined && formType == 'login') {
          window.location = "/"
        } if(formType == 'register' && registerErr == true) {
          window.location = '/login';
        } else if(formType == 'register' && registerErr == false) {
          return null
  
        }
      }

    });

  };


  return (
    <form className={styles.authForm}>

    <fieldset className={styles.formFieldSet}>
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
      <div className={styles.inputAndLabelCont}>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" ref={usernameInputRef} className={styles.formInputs} autoFocus/>
      </div>

      <div className={styles.inputAndLabelCont}>
        <label htmlFor="password">Pasword: </label>
        <input type="password" id="password" name="password" ref={passwordInputRef} className={styles.formInputs}/>
      </div>
      <button onClick={handleLogin} className={styles.formBtn}>{formType[0].toUpperCase() + formType.slice(1)}</button>
    </fieldset>
  </form>
  )
};

export default AuthForm;
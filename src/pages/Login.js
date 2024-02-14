import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import "./login.css";


const Login = () => { 
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [inputList, setInputList] = useState();

  const goBack = () => {       
    navigate(-1);
  }

  const handleLogin = async () => {
    // Perform authentication logic here (e.g., make an API request to validate credentials)
    // If authentication is successful, you can redirect the user to another page
    // If authentication fails, set an error message

    if (username === 'flytippinghere' && password === 'Since2022') {
      // Successful login, you can redirect the user here
      setInputList(<div className="proba-div7"> 
                     <h3><Link to="/admin" > Tovább az Admin oldalra </Link> </h3>
                   </div>) 
    
      console.log('Login successful');
    } else {
      setErrorMessage('Érvénytelen felhasználónév vagy jelszó ');
    }
  };

  return (

    <div className='container7'>

      <div>
        <div>
           <h2>A továbblépéshez be kell jelentkeznie</h2>&nbsp;
        </div>
      {errorMessage && <p>{errorMessage}</p>}

      <div className="header6">

      <form  className='form-style7'>
        <div>
          <label htmlFor="username">Felhasználónév:    </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Jelszó:    </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
      </div>

      <div className="button-div7">
         

        <button className="button-login7" onClick={handleLogin}>  Login  </button>
        <button className="button-back7" onClick={goBack}>Back</button>	   
        {inputList}
                   
     </div> 

    </div>
    </div>
  );
}

export default Login;

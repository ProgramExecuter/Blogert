import React, { useState } from 'react';
import axios from 'axios';
import createToken from '../../utils/createToken';
import setCookie from '../../utils/setCookie';
import { backend } from '../../utils/firebase';
import './login.css';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const req = await axios({
      method: 'post',
      url: `${backend}/auth/login`,
      data: {
        username,
        password
      }
    })
    .then(data => {
      console.log(data);
      const token = createToken(data._id);
      setCookie('jwt', token);
    })
    .catch(e => console.log(e));
    console.log(req);
  };

  return (
    <div className="container">
      <div className="login">

        <h1>Login</h1>
        <div className="login__textbox">
          <i className="fas fa-user"></i>
          <input type="text"
            placeholder="Username"
            name="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="login__textbox">
          <i className="fas fa-lock"></i>
          <input
            type="password" 
            placeholder="Password" 
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <input 
          type="button" 
          className="login__btn" 
          value="Sign in" 
          onClick={handleSubmit} 
        />

      </div>
    </div>
  );

};

export default Login;

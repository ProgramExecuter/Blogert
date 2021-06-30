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

    await axios({
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
    console.log();
  };

  return (
    <div className="login">
      <form className="login__loginBox" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label
          for="login__username" 
          className="login__loginBox__textbox"
        >
          <i className="fas fa-user"></i>
          <input
            id="login__username"
            type="text"
            placeholder="Username"
            name="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label
          for="login__password"
          className="login__loginBox__textbox"
        >
          <i className="fas fa-lock"></i>
          <input
            id="login__password"
            type="password" 
            placeholder="Password" 
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
        </label>
        <button
          type="submit" 
          className="login__loginBox__btn" 
        >
          Login
        </button>
      </form>
    </div>
  );

};

export default Login;

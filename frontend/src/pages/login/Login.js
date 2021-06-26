import React from 'react';
import './login.css';

const Login = () => {
  return (
    <div className="container">
      <div className="login">
        <h1>Login</h1>
        <div className="login__textbox">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Username" name="input[username]"/>
        </div>
        <div className="login__textbox">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" name="input[password]"/>
        </div>
        <input type="button" className="login__btn" value="Sign in" />
      </div>
    </div>
  );
};

export default Login;

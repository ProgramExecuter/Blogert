import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="container">
      <div class="login">
        <h1>Login</h1>
        <div class="login__textbox">
          <i class="fas fa-user"></i>
          <input type="text" placeholder="Username" />
        </div>

        <div class="login__textbox">
          <i class="fas fa-lock"></i>
          <input type="password" placeholder="Password" />
        </div>

        <input type="button" class="login__btn" value="Sign in" />
      </div>
    </div>
  );
}

export default Login;

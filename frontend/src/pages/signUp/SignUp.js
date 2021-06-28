import axios from 'axios';
import { useState } from 'react';
import countries from '../../utils/countryInfo';
import './signUp.css';
import createToken from '../../utils/createToken';
import setCookie from '../../utils/setCookie';
import { backend } from '../../utils/firebase';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("India");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const req = await axios({
      method: 'post',
      url: `${backend}/auth/signup`,
      data: {
        username,
        email,
        password,
        name,
        status,
        country
      }
    })
    .then(data => {
      console.log(data);
      const token = createToken(data._id);
      setCookie('jwt', token);
    })
    .catch(e => console.log(e));
  };

  return (
    <div className="container">
      <div className="signup">
        <h1>Sign Up</h1>
        <div className="signup__textbox">
          <i className="fas fa-user"></i>
          <input
            type="text" 
            placeholder="Username" 
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </div>
        <div className="signup__textbox">
          <i className="fas fa-lock"></i>
          <input 
            type="email" 
            placeholder="Email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="signup__textbox">
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
        <div className="signup__textbox">
          <i className="fas fa-lock"></i>
          <input 
            type="text" 
            placeholder="Full Name" 
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            />
        </div>
        <div className="signup__textbox">
          <i className="fas fa-lock"></i>
          <input 
            type="text" 
            placeholder="Tell community about Yourself" 
            name="status" 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            />
        </div>
        <div className="signup__textbox">
          <i className="fas fa-lock"></i>
          <select 
            name="country" 
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            >
            {
              countries.map(country => (
                <option value={country}>{country}</option> 
              ))
            }
          </select>
        </div>
        <input 
          type="button" 
          className="signup__btn" 
          value="Sign Up" 
          onClick={handleSubmit}
          />
      </div>
    </div>
  );
}

export default SignUp;

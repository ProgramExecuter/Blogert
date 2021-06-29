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

    await axios({
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
    <div className="signup">
      <form className="signup__signupBox" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label
          for="signup__username"
          className="signup__signupBox__textbox"
        >
          <i className="fas fa-user"></i>
          <input
            id="signup__username"
            type="text" 
            placeholder="Username" 
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </label>
        <label
          for="signup__email" 
          className="signup__signupBox__textbox"
        >
          <i className="fas fa-lock"></i>
          <input 
            id="signup__email" 
            type="email" 
            placeholder="Email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label
          for="signup__password"
          className="signup__signupBox__textbox"
        >
          <i className="fas fa-lock"></i>
          <input 
            id="signup__password"
            type="password" 
            placeholder="Password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        <label
          for="signup__name"
          className="signup__signupBox__textbox"
        >
          <i className="fas fa-lock"></i>
          <input 
            id="signup__name"
            type="text" 
            placeholder="Full Name" 
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            />
        </label>
        <label
          for="signup__status"
          className="signup__signupBox__textbox"
        >
          <i className="fas fa-lock"></i>
          <input 
            id="signup__status"
            type="text" 
            placeholder="Tell community about Yourself" 
            name="status" 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            />
        </label>
        <label
          for="signup__country"
          className="signup__signupBox__textbox"
        >
          <i className="fas fa-lock"></i>
          <select
            id="signup__country"
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
        </label>
        <button
          type="submit" 
          className="signup__signupBox__btn" 
        >Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

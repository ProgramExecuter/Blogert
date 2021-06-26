import countries from '../../assets/countryInfo';
import './signUp.css';

const SignUp = () => {
  return (
    <div className="container">
      <div className="signup">
        <h1>Sign Up</h1>
        <div className="signup__textbox">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Username" name="input[username]" />
        </div>
        <div className="signup__textbox">
          <i className="fas fa-lock"></i>
          <input type="email" placeholder="Email" name="input[email]" />
        </div>
        <div className="signup__textbox">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" name="input[password]" />
        </div>
        <div className="signup__textbox">
          <i className="fas fa-lock"></i>
          <input type="text" placeholder="Full Name" name="input[name]" />
        </div>
        <div className="signup__textbox">
          <i className="fas fa-lock"></i>
          <input type="text" placeholder="Describe Yourself in a Line!!" name="input[profile]" />
        </div>
        <div className="signup__textbox">
          <i className="fas fa-lock"></i>
          <select name="input[country]">
            {
              countries.map(country => (
                <option value={country}>{country}</option> 
              ))
            }
          </select>
        </div>
        <input type="button" className="signup__btn" value="Sign Up" />
      </div>
    </div>
  );
}

export default SignUp;

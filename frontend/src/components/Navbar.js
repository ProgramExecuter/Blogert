import React, { useContext, useEffect, useState} from 'react';
import getUserName from '../utils/getUserName';
import './navbar.css';
import logout from '../utils/logout';
import axios from 'axios';
import { backend } from '../utils/firebase';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState(null);
  
  const func = async () => {
    const ans = await getUserName();
    setUsername(ans);
  }

  useEffect(() => {
    func();
  }, [username]);

  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
    await axios.get(`${backend}/auth/logout`)
      .then(() => console.log('User Logged Out'))
      .catch(e => console.log(e))
    setUser(null);
  }

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <a className="link" href="/">
              HOME
            </a>
          </li>
          <li className="topListItem">
            <a className="link" href="/">
              ABOUT
            </a>
          </li>
          {
            user && (
            <li className="topListItem">
              <a className="link" href="/post/create">
                WRITE
              </a>
            </li>
            )
          }
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {
          user ? 
          (
            <a href={`/user/${user}`}>
              <b>{`${username}`}</b>
            </a>
          ) : (
          <ul className="topList">
            <li className="topListItem">
              <a className="link" href="/login">
                LOGIN
              </a>
            </li>
            <li className="topListItem">
              <a className="link" href="/signup">
                SIGNUP
              </a>
            </li>
          </ul>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
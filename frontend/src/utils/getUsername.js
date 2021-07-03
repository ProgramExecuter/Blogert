import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { jwtToken } from './firebase';
import isUserLogin from './isUserLogin';

const getUserName = () => {
  let user = null;
  if(isUserLogin()) {
    var token = Cookies.get().jwt;
    jwt.verify(token, jwtToken, (err, decoded) => {
      if(err)
        console.log(err);
      else
        user = decoded.username;
    });
  }
  return user;
};

export default getUserName;
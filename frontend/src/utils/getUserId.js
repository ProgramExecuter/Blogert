import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { jwtToken } from './firebase';
import isUserLogin from './isUserLogin';

const getUserId = () => {
  if(isUserLogin()) {
    var token = Cookies.get().jwt;
    jwt.verify(token, jwtToken, (err, decoded) => {
      if(err) {
        console.log(err);
      }
      else {
        console.log(decoded);
        return decoded;
      }
    });
  }
};

export default getUserId;
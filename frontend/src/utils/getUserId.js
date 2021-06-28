import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import isUserLogin from './isUserLogin';

const getUserId = () => {
  if(isUserLogin()) {
    var token = Cookies.get().jwt;
    var decoded = jwt.verify(token, "you need to tokenize this data");
    return decoded;
  }
};

export default getUserId;
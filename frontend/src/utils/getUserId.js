import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const getUserId = () => {
  var token = Cookies.get().jwt;
  var decoded = jwt.verify(token, "you need to tokenize this data");
  return decoded;
};

export default getUserId;
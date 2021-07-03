import jwt from 'jsonwebtoken';
import {jwtToken} from './firebase';

//For 3 days(in seconds)
const maxAge = 3 * 24 * 60 * 60;

const createToken = (username) => {
  return jwt.sign({username}, jwtToken, {
    expiresIn: maxAge
  });
};

export default createToken;
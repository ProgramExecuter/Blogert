import jwt from 'jsonwebtoken';
import {jwtToken} from './firebase';

//For 3 days(in seconds)
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({id}, jwtToken, {
    expiresIn: maxAge
  });
};

export default createToken;
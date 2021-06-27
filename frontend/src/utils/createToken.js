import jwt from 'jsonwebtoken';

//For 3 days(in seconds)
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({id}, "you need to tokenize this data", {
    expiresIn: maxAge
  });
};

export default createToken;
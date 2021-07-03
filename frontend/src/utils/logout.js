import Cookies from 'js-cookie';
import isUserLogin from './isUserLogin.js';

const logout = () => {
  if(isUserLogin) {
    Cookies.remove('jwt');
  }
};

export default logout;
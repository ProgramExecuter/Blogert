import Cookies from 'js-cookie';

const isUserLogin = () => {
  return ((Cookies.get().jwt) && (Cookies.get().jwt.length > 0));
};

export default isUserLogin;
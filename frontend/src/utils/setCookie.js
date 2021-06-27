import Cookies from 'js-cookie';

const setCookie = (key, val) => {
  Cookies.set(key, val);
};

export default setCookie;
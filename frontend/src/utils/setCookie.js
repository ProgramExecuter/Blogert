import Cookies from 'js-cookie';

const setCookie = (key, val) => {
  Cookies.set(key, val, { expires: 3});
};

export default setCookie;
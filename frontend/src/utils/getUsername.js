import axios from 'axios';
import isUserLogin from './isUserLogin';
import {backend} from './firebase';
import getUserId from './getUserId';

const getUserName = async () => {
  if(isUserLogin()) {
    const userId = getUserId();
    const response = await axios.get(`${backend}/user/${userId}`);
    if(!response.data)
      return null;
    return response.data.username;
  }
};

export default getUserName;
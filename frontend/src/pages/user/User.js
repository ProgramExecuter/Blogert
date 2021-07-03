import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import {backend} from '../../utils/firebase';
import './user.css';
import Error from '../../components/error/Error';
import UserProfile from '../../components/user/UserProfile';

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await axios.get(`${backend}/user/${username}`);
    setUser(response.data);
  }

  useEffect(() => {
    getUser();
  }, []);

  if(!user || Object.keys(user).length === 0)
    return <Error />
  return <UserProfile user={user} />
};

export default User;
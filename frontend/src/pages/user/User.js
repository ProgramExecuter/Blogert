import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import {backend} from '../../utils/firebase';
import './user.css';
import Error from '../../components/error/Error';
import UserProfile from '../../components/user/UserProfile';

const User = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  const getUser = async () => {
    const response = await axios.get(`${backend}/user/${userId}`);
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
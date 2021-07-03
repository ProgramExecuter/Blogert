import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {backend} from '../../utils/firebase';
import GridOfPosts from '../post/GridOfPosts';
import './userProfile.css';

const UserProfile = ({user}) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await axios.get(`${backend}/user/${user.username}/post`);
    setPosts(res.data);
  };
  
  useEffect(() => {
    getPosts();
  }, [])

  return (
    <div className="userProfile" key={user._id}>
      <div class="userProfile__info">
        <div className="userProfile__info__main">
          <p><b>{user.username}</b></p>
          <p>{user.country}</p>
        </div>
        <div className="userProfile__info__extra">
          <p><b>{user.name}</b></p>
          <p>{user.status}</p>
        </div>
      </div>
      <GridOfPosts data={posts} />
    </div>
  );
};

export default UserProfile;
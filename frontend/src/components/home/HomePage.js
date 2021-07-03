import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backend } from '../../utils/firebase';
import GridOfPosts from '../post/GridOfPosts';
import './homePage.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get(`${backend}/post`);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, [posts])

  return (
    <div className="homePage">
      <GridOfPosts data={posts}/>
    </div>
  );
};

export default HomePage;
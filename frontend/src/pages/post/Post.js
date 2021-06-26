import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './post.css';
import { useParams } from 'react-router';
import ParticularPost from '../../components/post/ParticularPost';
import Error from '../../components/error/Error';

const Post = () => {
  const { postId } = useParams();

  const [data, setData] = useState({});
  
  const getPost = async () => {
    const response = await axios.get(`http://localhost:2000/post/${postId}`);
    setData(response.data);
  };

  useEffect(() => {
    getPost();
  }, []);

  if(Object.keys(data).length === 0)
    return <Error />
  return <ParticularPost data={data}/>
};

export default Post;
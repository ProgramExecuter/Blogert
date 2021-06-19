import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './EditPost.css';

const EditPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  const getPost = async () => {
    const res = await fetch(`http://localhost:2000/post/${postId}`);
    const info = await res.json();
    
    setPost(info);
  };

  useEffect(() => {
    getPost();
  }, [])

  return (
    <div className="editPost">
      <input type="text" value={post.title} />
      <input type="text" value={post.caption} />
      <input type="file" />
    </div>
  );

}

export default EditPost;

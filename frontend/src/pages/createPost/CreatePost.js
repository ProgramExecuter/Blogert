import React from 'react';
import './createPost.css';

const CreatePost = () => {
  return (
    <div className="createPost">
      <input type="text" placeholder="Title of the Blog" />
      <input type="text" placeholder="Caption" />
      <input type="file" />
    </div>
  );
};

export default CreatePost;
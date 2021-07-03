import React from 'react';
import Card from './Card';
import './gridOfPosts.css';

const GridOfPosts = ({data}) => {
  // console.log("---grid", data);
  return (
    <div className="postGrid">
      {
        data.map(post => (
          <Card post={post} key={post._id}/>
        ))
      }
    </div>
  );
};

export default GridOfPosts;
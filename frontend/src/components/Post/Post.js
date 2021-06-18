import React, { useEffect, useState } from 'react'
import './Post.css';
import { useParams } from 'react-router';

const Post = () => {

  const { postId } = useParams();

  const [data, setData] = useState({});

  const getPost = async () => {
    const response = await fetch(`http://localhost:2000/post/${postId}`);
    const info = await response.json();
    
    setData(info);
  };

  useEffect(() => {
    getPost();
  }, []);
  
  return (
    <div className="post">
      <div className="post__header">
        <h1>{data.title}</h1>
      </div>
      <div className="post__info">
        <img className="post__info__image" src={data.picture} alt="Avatar" />
        <div class="post__info__content">
          <p>
            <b className="post__info__content__user">
              <span>
                <span>❤</span> 
                {data.likes.length}
              </span>
              {data.user.username}
            </b>
            {data.caption}
          </p>
        </div>
        <div className="post__info__comments">
          {
            data.comments.map(comment => (
              <p><b><span><span>❤</span> {comment.likes.length}</span>{comment.username}</b>{comment.content}</p>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Post;
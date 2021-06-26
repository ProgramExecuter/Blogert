import React from 'react';
import './particularPost.css';

const ParticularPost = ({data}) => {
  
  return (
    <div className="post">
      <div className="post__header">
        <h1>{data.title}</h1>
      </div>
      <div className="post__info">
        <img className="post__info__image" src={data.picture} alt="Avatar" />
        <div className="post__info__content">
          <p>
            <b className="post__info__content__user">
              <span>
                <span>❤</span> 
                {data.likes.length}
              </span>
              {data.username}
            </b>
            {data.caption}
          </p>
        </div>
        {
          data.comments.length>0 && (
            <div className="post__info__comments">
              {
                data.comments.map(comment => (
                  <p><b><span><span>❤</span> {comment.likes.length}</span>{comment.username}</b>{comment.content}</p>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ParticularPost

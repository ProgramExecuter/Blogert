import React from 'react';
import './particularPost.css';

const ParticularPost = ({data}) => {
  return (
    <div className="post">
      <div className="post__header">
        <h1>{data.title}</h1>
      </div>
      <div className="post__info">
        {
          data.picture && (<img className="post__info__image" src={data.picture} alt="Avatar" />)
        }
        <div className="post__info__content">
          <p>
            <b className="post__info__content__user">
              {data.username}
            </b>
            {data.caption}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParticularPost;

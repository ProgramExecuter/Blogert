import React from 'react';
import './card.css';

const Card = ({post}) => {

  return (
    <a className="postCard" href={`../post/${post._id}`}>
      <div className="postCard__title">
        <h3>{post.title}</h3>
      </div>
      <img
        src={post.picture}
        alt={post.title}
      />
      <div class="postCard__content">
        <p>
          <b>
            <a
              href={`./user/${post.username}`}
              className="postCard__content__username"
              >
                {post.username}
            </a> - </b>
          {post.caption.substring(0, 70)}
          {post.caption.length>70 ? '.....' : ''}
        </p>
        <p class="postCard__content__date">
          {post.post_date}
        </p>
      </div>
    </a>
  );
  
};

export default Card;
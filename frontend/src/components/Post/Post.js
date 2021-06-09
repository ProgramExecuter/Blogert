import React from 'react'
import './Post.css';

const Post = () => {
  const comments = [
    {
      user: "Executer",
      caption: "Cool Stuff🥱"
    },
    {
      user: "Saitama",
      caption: "Serious serious, serioooouss punnchh👊"
    },
    {
      user: "Noob",
      caption: "What is hiking anyways???"
    },
  ]
  return (
    <div className="post">
      <div className="post__header">
        <h1>Hiking In China</h1>
      </div>
      <div className="post__info">
        <img className="post__info__image" src="https://images.mktw.net/im-297006?width=620&size=1.471264367816092" alt="Avatar" />
        <div class="post__info__content">
          <p><b className="post__info__content__user">John Doe</b>Hiking is enjoyable or fun, if you don't forget the path😎</p>
        </div>
        <div className="post__info__comments">
          {
            comments.map(comment => (
              <p><b>{comment.user}</b>{comment.caption}</p>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Post;

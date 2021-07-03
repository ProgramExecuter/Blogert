import axios from 'axios';
import React from 'react';
import { backend } from '../../utils/firebase';
import getUserName from '../../utils/getUserName';
import './particularPost.css';

const ParticularPost = ({data}) => {
  const username = getUserName();

  const handleDelete = async (e) => {
    await axios({
      method: "delete",
      url: `${backend}/post/${data._id}`
    })
  }

  return (
    <div className="post" key={data._id}>
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
      {data.username === username && (
        <div class="post__buttons">
          <button><a href={`./${data._id}/edit`}>Update</a></button>
          <button onClick={handleDelete}>Delete</button>
        </div>
        )
      }
    </div>
  );
};

export default ParticularPost;

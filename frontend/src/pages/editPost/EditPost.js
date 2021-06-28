import React, { useState } from 'react';
import {useParams} from 'react-router';
import axios from "axios";
import {storage, backend} from '../../utils/firebase';
import './editPost.css';

const EditPost = ({data}) => {
  const { postId } = useParams();

  const [title, setTitle] = useState(data.title);
  const [caption, setCaption] = useState(data.caption);
  const [picture, setPicture] = useState(data.picture);

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(file) {
      const name = new Date() + file.name;
      const ref = storage.ref();
      
      const uploadTask = ref.child(name).put(file);
      uploadTask
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(async url => {
        setPicture(url)

        await axios({
          method: 'post',
          url: `${backend}/post/${postId}/edit`,
          data: {
            title,
            caption,
            picture
          }
        })
        .catch(e => console.log(e));
        
      })
      .catch(e => console.log(e));
    }
    else {
      await axios({
        method: 'post',
        url: `http://localhost:2000/post/${postId}/edit`,
        data: {
          title,
          caption,
          picture
        }
      })
      .catch(e => console.log(e));
    }
  };

  return (
    <div className="write">
      <img
        className="writeImg"
        src={
          file ? URL.createObjectURL(file) : data.picture
        }
      alt="" />
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            name="title"
            autoFocus={true}
            value={title}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            name="caption"
            className="writeInput writeText"
            value={caption}
            onChange={e=>setCaption(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default EditPost;
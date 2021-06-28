import React, { useState } from 'react';
import axios from "axios";
import {storage, backend} from '../../utils/firebase';
import './createPost.css';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [picture, setPicture] = useState("");
  
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const name = new Date() + file.name;
    const ref = storage.ref();
    const uploadTask = ref.child(name).put(file);

    uploadTask
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(async url => {
      setPicture(url)

      await axios({
        method: 'post',
        url: `${backend}/post`,
        data: {
          title,
          caption,
          picture
        }
      })
      .catch(e => console.log(e));

    })
    .catch(e => console.log(e));
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
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

export default CreatePost;
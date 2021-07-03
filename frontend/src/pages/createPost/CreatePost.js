import React, { useEffect, useState } from 'react';
import axios from "axios";
import {storage, backend} from '../../utils/firebase';
import getUserName from '../../utils/getUserName';
import './createPost.css';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [picture, setPicture] = useState("");
  const [progress, setProgress] = useState(0);
  
  const [username, setUsername] = useState(null);
  
  const func = async () => {
    const ans = await getUserName();
    setUsername(ans);
  }

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const name = new Date() + file.name;
    const uploadTask = storage.ref(`postImages/${name}`).put(file);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes)*100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("postImages")
          .child(name)
          .getDownloadURL()
          .then(async url => {
            await axios({
              method: "POST",
              url: `${backend}/post`,
              data: {
                title,
                caption,
                picture: url,
                username
              }
            })
          })
      }
    );

  };

  useEffect(() => {
    func();
  }, [])

  return (
    <div className="write">
      {file && (
        <img className="write__img" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="write__form" onSubmit={handleSubmit}>
        <div className="write__form__group">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            name="title"
            autoFocus={true}
            value={title}
            onChange={e=>setTitle(e.target.value)}
            required
          />
        </div>
        <div className="write__form__group">
          <textarea
            placeholder="Tell your story..."
            type="text"
            name="caption"
            className="writeInput writeText"
            value={caption}
            onChange={e=>setCaption(e.target.value)}
            required
          ></textarea>
        </div>
        <button className="write__form__submit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
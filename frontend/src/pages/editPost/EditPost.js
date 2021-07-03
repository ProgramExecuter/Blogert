import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router';
import axios from "axios";
import {storage, backend} from '../../utils/firebase';
import './editPost.css';

const EditPost = () => {
  const { postId } = useParams();
  
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [picture, setPicture] = useState("");

  const [progress, setProgress] = useState(0);

  const getPost = async () => {
    const response = await axios.get(`${backend}/post/${postId}`);
    setData(response.data);
    setTitle(response.data.title);
    setPicture(response.data.picture);
    setCaption(response.data.caption);
  };

  useEffect(() => {
    getPost();
  }, []);

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(file) {
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
                method: "put",
                url: `${backend}/post/${postId}`,
                data: {
                  title,
                  caption,
                  picture: url
                }
              })
            })
        }
      );
    }
    else {
      await axios({
        method: 'put',
        url: `${backend}/post/${postId}`,
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
    <div className="update">
      <img
        className="update__img"
        src={
          file ? URL.createObjectURL(file) : data.picture
        }
      alt="" />
      <form className="update__form" onSubmit={handleSubmit}>
        <div className="update__form__group">
          <label htmlFor="fileInput">
            <i className="updateIcon fas fa-plus"></i>
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
            className="updateInput"
            name="title"
            value={title}
            onChange={e=>setTitle(e.target.value)}
            required
          />
        </div>
        <div className="update__form__group">
          <textarea
            placeholder="Tell your story..."
            type="text"
            name="caption"
            className="updateInput updateText"
            value={caption}
            onChange={e=>setCaption(e.target.value)}
            required
          ></textarea>
        </div>
        <button className="update__form__submit" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;
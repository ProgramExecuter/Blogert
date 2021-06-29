import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router';
import axios from "axios";
import {storage, backend} from '../../utils/firebase';
import '../createPost/createPost.css';

const EditPost = () => {
  const { postId } = useParams();
  
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [picture, setPicture] = useState("");

  const getPost = async () => {
    const response = await axios.get(`${backend}/post/${postId}`);
    setData(response.data);
    setTitle(response.data.title);
    setPicture(response.data.url);
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
        method: 'put',
        url: `http://localhost:2000/post/${postId}`,
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
        className="write__img"
        src={
          file ? URL.createObjectURL(file) : data.picture
        }
      alt="" />
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
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            name="title"
            // autoFocus={true}
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

export default EditPost;
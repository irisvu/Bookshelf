import React, { useState } from 'react'
import './ImageUpload.css'


import { storage } from '../firebase'

import {  ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import axios from 'axios'

import 'firebase/storage'





const ImageUpload = ({ username }) => {
 const [image, setImage] = useState(null)
 const [progress, setProgress] = useState(0)
 const [caption, setCaption] = useState('')
 const [url, setUrl] = useState('');


const handleChange = e => {
 if(e.target.files[0]) {
 setImage(e.target.files[0])
 }
 }


const handleUpload = () => {

  
  const uploadTask = uploadBytesResumable(ref(storage, `images/${image.name}`));
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(ref(storage, `images/${image.name}`)).then((url) => {
          setUrl(url);
          axios
            .post('/upload', {
              caption: caption,
              user: username,
              image: url,
            })
            .then(() => {
              setProgress(0);
              setCaption('');
              setImage(null);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    );
  }

 return (
 <div className='imageUpload'>
    <progress className='imageUpload__progress' value={progress} max="100" />
      <input
          type="text"
          placeholder="Enter a caption..."
          className="imageUpload__input"
          value={caption}
          onChange={e => setCaption(e.target.value)}
      />
      <input className="imageUpload__file" type="file" onChange={handleChange} />
       <button className="imageUpload__button" onClick={handleUpload}>Upload</button>
  </div>
 )
}
export default ImageUpload


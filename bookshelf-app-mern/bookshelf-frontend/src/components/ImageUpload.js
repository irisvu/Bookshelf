import React, { useState } from 'react'
import './ImageUpload.css'


import { storage } from '../firebase'

import {  getStorgae, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import axios from '../axios'

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

  const storageRef= ref(storage, 'images/${image.name}')

  const uploadTask = uploadBytesResumable(storageRef, image)

  //listen for state changes errors and completion of the upload

  uploadTask.on('state_changed',
  (snapshot) => {
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
  case 'paused':
  console.log('Upload is paused');
  break;
  case 'running':
  console.log('Upload is running');
  break;
  }
  },
  (error) => {
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  console.log(error)
  switch (error.code) {
  case 'storage/unauthorized':
  // User doesn't have permission to access the object
  break;
  case 'storage/canceled':
  // User canceled the upload
  break;
  
  // ...
  
  case 'storage/unknown':
  // Unknown error occurred, inspect error.serverResponse
  break;
  }
  },
  () => {
  // Upload completed successfully, now we can get the download URL
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  setUrl(downloadURL);
  axios.post('/upload', {
  caption: caption,
  user: username,
  image: downloadURL
  })
  setProgress(0);
  setCaption("");
  setImage(null);
  console.log('File available at', downloadURL);
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

/*
 
  const uploadTask = ref(storage, `images/${image.name}`);
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
  ); */
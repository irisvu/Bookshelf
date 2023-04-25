import React, { useState } from 'react'
import './ImageUpload.css'
//import './App.js'

const ImageUpload = ({ username }) => {
 const [image, setImage] = useState(null)
 const [progress, setProgress] = useState(0)
 const [caption, setCaption] = useState('')
const handleChange = e => {
 if(e.target.files[0]) {
 setImage(e.target.files[0])
 }
 }
const handleUpload = () => {}
 return (
 <div className="imageUpload">
 <progress className="imageUpload__progress" value={progress} 
max="100" />
 <input
 type="text"
 placeholder="Enter a caption..."
 className="imageUpload__input"
 value={caption}
 onChange={e => setCaption(e.target.value)}
 />
 <input className="imageUpload__file" type="file" 
onChange={handleChange} />
 <button className="imageUpload__button" 
onClick={handleUpload}>Upload</button>
 </div>
 )
}
export default ImageUpload
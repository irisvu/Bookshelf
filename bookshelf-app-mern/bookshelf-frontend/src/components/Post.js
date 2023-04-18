import React from 'react'
import './Post.css'
import { Avatar } from '@material-ui/core'
const Post = () => {
 return (
 <div className="post">
    <div className="post__header">
    <Avatar
 className="post__avatar"
 alt="TWD"
 src="/static/images/avatar/1.jpg"
 />
    
 <h3>TWD</h3>
 </div>
 <img className="post__image" src="https://www.techlifediary.
com/wp-content/uploads/2020/06/react-js.png" alt="React" />
 <h4 className="post__text"><strong>thewebdev</strong>�Build a 
Messaging app with MERN (MongoDB, Express, React JS, Node JS) 
�</h4>
 </div>
 )
}

export default Post

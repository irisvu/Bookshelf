import './App.css';
import Post from './components/Post';
import React, { useEffect, useState } from 'react';

function App() {

    const [posts, setPosts] = useState([
        {
        username: "TWD",
        caption: "�Build a Messaging app with MERN Stack�",
        imageUrl: "https://www.techlifediary.com/wp-content/uploads/2020/06/react-js.png"
        },
        {
        username: "nabendu82",
        caption: "Such a beautiful world",
        imageUrl: "https://quotefancy.com/media/wallpaper/3840x2160/126631-Charles-Dickens-Quote-And-a-beautiful-world-you-live-in-when-it-is.jpg"
        },
        
        ])
    
 return (
 <div className="app">
 <div className="app__header">
 <img className="app__headerImage" src="logo192.png" alt="Header" />
 </div>
 {posts.map(post => (
 <Post username={post.username} caption={post.caption} 
imageUrl={post.imageUrl} />
 ))}
 <Post />
 <Post />
 <Post />
 </div>
 );
}
export default App;

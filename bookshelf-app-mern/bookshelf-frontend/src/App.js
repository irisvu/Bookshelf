import './App.css';
import Post from './components/Post';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { Button, Input } from '@mui/material';



function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = styled((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[16],
    padding: theme.spacing(2, 4, 3),
  },
}));






function App() {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false)

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
     <Modal open={open} onClose={() => setOpen(false)}>
    <div style={modalStyle} className={classes.paper}>
     <h2>Modal Code</h2>
    </div>
    </Modal>
 <div className="app__header">
    <Button onClick={() => setOpen(true)}>Sign Up</Button>
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

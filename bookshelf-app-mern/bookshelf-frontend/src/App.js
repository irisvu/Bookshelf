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
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
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
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    ...getModalStyle(),
  },
}));






function App() {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
        const signUp = e => {
            e.preventDefault()

            setOpen(false);
            }
    
 return (
 <div className="app">
     <Modal open={open} onClose={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={modalStyle} className={classes.paper}>
     <h2>Modal Code</h2>
     <form className="app__signup">
    <center>
        <img className="app__headerImage" src="logo192.png" 
         alt="Header" />
    </center>
        <Input placeholder="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
        />
        <Input placeholder="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        <Input placeholder="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
 <Button type="submit" onClick={signUp}>Sign Up</Button>
 </form>
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

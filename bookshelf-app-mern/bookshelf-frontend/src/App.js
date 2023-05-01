import './App.css';
import Post from './components/Post';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { Button, Input } from '@mui/material';
import { auth, createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile} from './firebase';
import ImageUpload from './components/ImageUpload';
import axios from './axios'
import Pusher from 'pusher-js'





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



const pusher = new Pusher('88dd678dec002dcc670f', {
  cluster: 'us3'
 });



function App() {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [openSignIn, setOpenSignIn] = useState(false)
    

    const [posts, setPosts] = useState([
        {
        user: "TWD",
        caption: "�Build a Messaging app with MERN Stack�",
        image: "https://www.techlifediary.com/wp-content/uploads/2020/06/react-js.png"
        },
        {
        user: "nabendu82",
        caption: "Such a beautiful world",
        image: "https://quotefancy.com/media/wallpaper/3840x2160/126631-Charles-Dickens-Quote-And-a-beautiful-world-you-live-in-when-it-is.jpg"
        },
        
        ])


        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((authUser) => {
              if (authUser) {
                console.log(authUser);
                setUser(authUser);
              } else {
                setUser(null);
              }
            });
          
            return () => {
              unsubscribe();
            };
          }, [user, username])

          const fetchPosts = async () => {
            await axios.get("/sync").then(response => setPosts(response.data))
          }

          useEffect(() => {
            const channel = pusher.subscribe('posts');
            channel.bind('inserted', (data) => {
            fetchPosts()
            });
            }, [])



              useEffect(() => {

                fetchPosts()
              },[])




          
          const signUp = (e) => {
            e.preventDefault();
            createUserWithEmailAndPassword(auth,email, password)
              .then((authUser) => {
                const user = authUser.user;
                //user.updateProfile({displayName: username})
                updateProfile(authUser.user,{displayName:username})
                console.log(authUser)
                setOpen(false)
                
              })
              .catch((error) => {
                alert(error.message)
               
                
              });
          }
          const signIn = (e) => {
            e.preventDefault();
            signInWithEmailAndPassword(auth, email, password)
              .then(() => {
                setOpenSignIn(false);
              })
              .catch((error) => {
                alert(error.message);
              });
          };
          
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
<Modal open={openSignIn} onClose={() => setOpenSignIn(false)}  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
              <center>
                  <img className="app__headerImage"
                       src="logo192.png" 
                       alt="Header" />
                 </center>
                     <Input placeholder="email"
                             type="text" 
                             value={email}
                         onChange={e => setEmail(e.target.value)} />
                     <Input placeholder="password"
                            type="password" 
                            value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <Button type="submit" onClick={signIn}>Sign In</Button>
            </form>
        </div>
    </Modal>
    <div className="app__header">
        <img className="app__headerImage" src="logo192.png" alt="Header" />
            {user ? <Button onClick={() => auth.signOut()}>Logout</Button> :(
            <div className="app__loginContainer">
                <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                <Button onClick={() => setOpen(true)}>Sign Up</Button>
            </div>
            )}
    </div>

    <div className="app__posts">
             {posts.map(post => (
              <Post 
              key={post._id}
              username={post.user}
               caption={post.caption} 
              imageUrl={post.image} 
              />
         ))}


    </div>
        
    {user?.displayName ? <ImageUpload username={user.displayName} /> : 
    <h3 className="app__notLogin">Need to login to upload</h3>}
    
    

 </div>
 );
}
export default App;
























/*<div className="app__header">
    {user ? <Button onClick={() => auth.signOut()}>Logout</Button> : 
    <Button onClick={() => setOpen(true)}>Sign Up</Button>}
 <img className="app__headerImage" src="logo192.png" alt="Header" />

 </div>
 <div className="app__posts">
 {posts.map(post => (
 <Post username={post.username} caption={post.caption} 
imageUrl={post.imageUrl} />
 ))}
 </div>*/


 /*  <div className="app__header">
    <img className="app__headerImage" src="logo192.png" alt="Header" />
    {user ? <Button onClick={() => auth.signOut()}>Logout</Button> :(
        <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
         </div>
     )}


     <div className="app__posts">
        {posts.map(post => (
            <Post username={post.username} caption={post.caption} 
            imageUrl={post.imageUrl} />
        ))}
        </div>
        {user?.displayName ? <ImageUpload username={user.displayName} /> : 
        <h3 className="app__notLogin">Need to login to upload</h3>}
    </div> */

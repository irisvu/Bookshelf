import './App.css';
import Post from './components/Post';
function App() {
 return (
 <div className="app">
 <div className="app__header">
 <img className="app__headerImage" src="logo192.png" alt="Header" />
 </div>
 <Post />
 <Post />
 <Post />
 </div>
 );
}
export default App;

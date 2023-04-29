import axios from 'axios'
const instance = axios.create({
 baseURL: "https://bookshelfbackend.onrender.com/"
})
export default instance
 
//imports
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import bodyParser from 'body-parser'
import path from 'path'
import Pusher from 'pusher'

//app config
Grid.mongo = mongoose.mongo
const app = express()
const port = process.env.PORT || 9000
const connection_url = "" // <-- mongodb connection url

//middleware
app.use(bodyParser.json())
app.use(cors())


// - - - - - - - - - DB Config & connection - - - - - - - - - -//

// --- working on image uploading --- //

const connection = mongoose.createConnection(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true}) //image upload connection

let gfs //creating a gfs var (to be used for working with the db with grid (specializes in reading and rendering images)))

connection.once('open', () => { //once the connection is open, 
    
    //print to the log that the db is connected
    console.log("DB Connected")

    //set the gfs var to connect to the db (using Grid)
    gfs = Grid(connection.db, mongoose.mongo) 
    //creating a collection called images
    gfs.collection('images')

})

//creating a storage variable that will call a function that will take a file add data to it to make it uploadable to the db
const storage = new GridFsStorage({
    url: connection_url,
    file: (req, file) => {
        //creating a promise that will return a new file with a name and bucket name
        return new Promise((resolve, reject) => {
            //making the filename unique by adding the date to it
            const filename = `image-${Date.now()}${path.extname(file.originalname)}` 
            //creating a file object that will have the filename and bucket name
            const fileInfo = {
                filename: filename,
                bucketName: 'images' //(bucket name is the collection name)
            }
            resolve(fileInfo)
        })
    }
})

//uploading the file to the db through passing the storage variable that holds the image data
const upload = multer({ storage }) 


// --- working on get and post connections --- //

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    }) // normal gets and posts connection

// - - - - - - - - - - API ROUTES - - - - - - - - - - //

app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

app.post("/upload/image", upload.single("file"), (req, res) => {
    res.status(201).send(req.file)
})


//listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`))
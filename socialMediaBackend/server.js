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

//middleware
app.use(bodyParser.json())
app.use(cors())


//DB Config
//api routes
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))
//listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`))
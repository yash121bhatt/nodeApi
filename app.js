const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})

const port = process.env.PORT || 8000

const api = require('./routes/api')
const connectDB = require('./db/connect_db')
const fileUpload = require("express-fileupload");
const cors  = require('cors')


// for data get i api
app.use(express.json())

//For Api Communication
app.use(cors())

// connect mongodb
connectDB()

app.use(fileUpload({useTempFiles: true}));

// Router load
app.use('/api', api)

app.listen(port, () => {
	console.log(`Server is running http://localhost:${port}`);
})


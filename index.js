const express = require('express');
require('dotenv').config({path:'./config/.env'});
require('./config/db');


const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes')
const cors = require('cors');


const app = express()
const port = process.env.PORT;
const option = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

app.use(cors(option));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())


app.use('/api/user', userRoutes );
app.use('/api/post', postRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
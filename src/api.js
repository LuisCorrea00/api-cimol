const express=require('express');
const cors = require('cors');
const app=express();

app.use(cors())

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const {
    BASE_URL,
    KEY_TOKEN,
    DB_HOST,
    DB_USER,
    DB_USER_PASS,
    DB_DATABASE
  
  } = require ('./config');

//const router=express.Router();
const route=require("./routers/route");
const userRoute=require("./routers/user");
app.use('/', route);
app.use('/user', userRoute);

module.exports=app;


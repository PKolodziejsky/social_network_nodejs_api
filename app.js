const express =  require('express');
const server = express();
const postRoutes = require('./routes/post');
const authRoutes =require('./routes/auth');
const userRoutes =require('./routes/user');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const expValid = require("express-validator");
//cross sharing
const cors =require("cors");

dotenv.config();

mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser:true},{useUnifiedTopology:true}).then(() => console.log("DB connected"));

mongoose.connection.on('error' , err =>{
    console.log("DB connection failed:" , err.message)
});

//middleware

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(expValid());
server.use(cors());
server.use('/' ,postRoutes);
server.use('/' ,authRoutes);
server.use('/' ,userRoutes);

server.use(function (err,req,res,next){
    if (err.name === "UnauthorizedError"){
        res.status(401).json({error:"Unauthorized. Please sign in."})
    }
});

const port =8080;
server.listen(port , ()=> console.log('Nodejs API is listening on',port,'...'));
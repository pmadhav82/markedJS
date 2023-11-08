
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require ("hbs")
var indexRouter = require('./routes/index');
const commentRouter = require("./routes/comment")
const mongoose = require("mongoose");

 const mongodbURL =  "mongodb://0.0.0.0:27017/mylocalDB";

var app = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use("/comment", commentRouter)


mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("connected to the database");
  })
  .catch((er) => {
    console.log(er.message);
  });



app.listen(3000,  ()=>{
  console.log("server is running on port 3000")
})

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
title:{
    required:true,
    type:String
},
html:{
    required:true,
    type:String,

},
contain:{
  required:true,
  type:String
},
createdAt:{
    type:Date,
    default: Date.now()
}
})
 module.exports = new  mongoose.model("posts", postSchema)
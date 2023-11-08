const commentRouter = require("express").Router();
const Comment = require("../module/comment")




commentRouter.post("/", async (req, res)=>{
const {comment, postId} = req.body;
if(comment.trim().length> 0){
    try{
        await new Comment({
            text:comment,
            post:postId,
        
        }).save()
            res.status(201).json({success:true,
            message:"Comment is added successfully"})


    } catch(er){
        res.status(400).json({success:false, message:"Comment could not be saved"})
    }
}
else{
    res.status(400).json({success:false, message:"Comment field can not be empty"})
}
 
}).get("/" , async(req,res)=>{
const {postId} = req.query;
try{
   const comments =  await Comment.find({post:postId}).sort({_id:-1}).lean()
   if(comments){

       res.status(200).json(comments)
   }else{
    res.status(200).json({message:"No comments!"})
   }
}catch(er){
    console.log(er.message)
}
})


module.exports = commentRouter;
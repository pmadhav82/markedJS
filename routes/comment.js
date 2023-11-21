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
   const comments =  await Comment.find({post:postId,parentComment:null }).sort({_id: 1}).populate("replies").exec()
   if(comments){

       res.status(200).json(comments)
   }else{
    res.status(200).json({message:"No comments!"})
   }
}catch(er){
    console.log(er.message)
}
}).delete("/", async(req,res)=>{
    const {commentId} = req.body
    try{
    const comment =  await Comment.findOne({_id:commentId}).lean();

    if(comment){
             await Comment.deleteMany({_id:{$in:comment.replies}})
    const deleted = await Comment.deleteOne({_id:commentId})
    if(deleted){
        res.status(200).json({message:"Comment deleted"})
    }else{
        res.status(400).json({message:"Comment can not be deleted"})
    }
    
    }else{
        res.status(400).json({message:"Comment can not be deleted"})
    }
    }catch(er){
        console.log(er.message)
    }
})



commentRouter.post("/reply", async (req,res)=>{
const {reply, parentId, postId} = req.body;
if(reply.trim().length> 0){
     
    try{
        const replyText = new Comment({text:reply, post:postId,  parentComment:parentId})
        await replyText.save()
        await Comment.findByIdAndUpdate(parentId,{$push:{replies:replyText._id}})
    
        res.status(201).json(replyText);
    }catch(er){
        console.log(er)
    }


}else{
    res.status(500).json({message:"Failed to post a reply"})
}

})

module.exports = commentRouter;
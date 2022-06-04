var express = require('express');
var router = express.Router();

  

const createDOMPurify = require('dompurify');
const { JSDOM } = require("jsdom");
const { marked } = require('marked');

const window = new JSDOM('').window;
 const DOMPurify = createDOMPurify(window);



let posts = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// GET Blogs
router.get("/newPost", (req,res)=>{
  if(posts.length>0){
    res.render("post",{
      posts
    })

  } else{
    res.redirect("/")
  }
})

//POST a Blog
router.post("/", (req,res)=>{
  const {title, contain} = req.body;
  
  if(title=== "" || contain ===""){
    res.render("index",{
      errorMessage:"All field are required to fill."
    })
  }
  else{
    
     const html      = DOMPurify.sanitize(marked.parse(contain))
  

   const newPost = {
     title,
     html,
     id : new Date().getTime().toString()
   }

   posts.push(newPost);

res.redirect("newPost")
 }



// GET a single blog
 router.get("/post/:id", (req,res)=>{

  const {id}= req.params;
  const post = posts.filter(p=>{
    return p.id === id;
  })
  
  res.render("singlePost",{
    post
  })
 })
  
// DELETE post
router.get("/deletePost/:id",(req,res)=>{
  const {id}= req.params;
  let itemTobeRemoved = posts.findIndex(post=> post.id === id);
  posts.splice(itemTobeRemoved,1);
  res.redirect("/newPost")
})



})

module.exports = router;

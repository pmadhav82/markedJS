var express = require('express');
var router = express.Router();

  

const createDOMPurify = require('dompurify');
const { JSDOM } = require("jsdom");
const { marked } = require('marked');

const window = new JSDOM('').window;
 const DOMPurify = createDOMPurify(window);



let posts = [];



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
     contain,
     html,
     id : new Date().getTime().toString()
   }

   posts.push(newPost);

res.redirect("newPost")
 }
}
)



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{
    title: req.body.title,
    contain: req.body.contain
  });
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





// GET a single blog
router.get("/post/:id",(req,res)=>{

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

// Edit post

router.get("/editPost/:id",(req,res)=>{
  const {id}= req.params;
  
  let item= posts.find(post=> post.id === id);

  res.render("edit",{
    title: item.title,
    contain: item.contain.replace(/\s+/g,' ').trim(),
    id
  })
})


router.post("/editPost/:id",(req,res)=>{
  const {id} = req.params;
  let editItem = posts.find(p=> p.id === id);
  
  let {title, contain}= req.body;
  const html      = DOMPurify.sanitize(marked.parse(contain.trim()))
  editItem.title = title;
  editItem.contain = contain.trim();
  editItem.html = html;
  res.redirect("/newPost")
  

})








module.exports = router;

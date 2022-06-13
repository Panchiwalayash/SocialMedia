const express=require("express")
const router=express.Router()
const Post=require("../models/Post")
const User=require("../models/User")


//create
router.post("/",async(req,res)=>{
    const newPost=new Post(req.body)
    try {
        const savePost=await newPost.save()
        res.status(200).json(savePost)
    } catch (error) {
        res.status(500).send(error)
    }
})

//update
router.put("/:id",async(req,res)=>{
    try {      
        const post=await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("Your post has been updated")
        }
        else{
            res.status(403).json("You cannot update this post")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

//delete
router.delete("/:id",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json("post has been deleted")
        }
        else{
            res.status(403).send("You can Not delete this post")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

//like
router.put("/:id/like",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(!post.likes.includes(post.userId)){

            if(!post.likes.includes(req.body.userId)){
                await post.updateOne({$push: {likes:req.body.userId}})
                res.status(200).json("You had liked the post")
            }
            else{
                await post.updateOne({$pull : {likes:req.body.userId}})
                res.status(200).json("You had unliked the post")
            }
        }
        else{
            res.status(200).send("You cant like your post")
        }
        } catch (error) {
        res.status(500).json(error)
    }
})

//get
router.get("/:id",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
        
        }
     catch (error) {
        res.status(500).json(error)
    }
})

//get timeline
router.get("/timeline/:userId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.following.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
      res.status(500).json(err,"somme error had occured");
    }
  });

//users all post
router.get('/profile/:username',async(req,res)=>{
    try {   
        const user=await User.findOne({username:req.params.username})
        const posts=await Post.find({userId:user._id})
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports=router
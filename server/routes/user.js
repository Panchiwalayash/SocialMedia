const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User=require("../models/User")

//update
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password=await bcrypt.hash(req.body.password,salt)
            } catch (error) {
                res.status(500).json(error)
            }
        }
        try{
            const user= await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            })
            res.status(200).json("Account has been updated")
        }catch(error){
            res.status(500).json(error)
        }
    }
    else {
        return res.status(403).json("You can update only your account")
    }
})

//delete
router.delete('/:id',async(req,res)=>{
    if(req.body.userId==req.params.id || req.body.isAdmin){
        try {
            const user=await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account has been deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

// get

router.get('/',async(req,res)=>{
    const userId = req.query.userId
    const username=req.query.username
    try {
        const user=userId 
        ? await User.findById(userId) 
        : await User.findOne({username: username})
        const {password,updatedAt, ...other}=user._doc //for not showing password and updateAt
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get friend

router.get('/friends/:userId',async(req,res)=>{
    try {
        const user=await User.findById(req.params.userId)
        const friends=await Promise.all(
            user.following.map(followerTd=>{
                return User.findById(followerTd)
            })
            
            )
            let friendList=[]
            friends.map(friend=>{
                const {_id,username,profilePicture}=friend
                friendList.push({_id,username,profilePicture})
            })
            res.status(200).json(friendList)
    } catch (error) {
        res.status(500).json(error)
    }
})

//follow
router.put("/:id/follow",async(req,res)=>{
    if(req.body.userId!=req.params.id){
        try {
            const user=await User.findById(req.params.id)
            const currentUser=await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{following:req.params.id}})
                res.status(200).send("user has been followed")
            }
            else{
                res.status(403).send("You already follow this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("You cant follow yourself")
    }
})

//unfollow
router.put("/:id/unfollow",async(req,res)=>{
    if(req.body.userId!=req.params.id){
        try {
            const user=await User.findById(req.params.id)
            const currentUser=await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{following:req.params.id}})
                res.status(200).send("user has been unfollowed")
            }
            else{
                res.status(403).send("You cant unfollow the user you aren't following")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("You cant unfollow yourself")
    }
})

module.exports = router;
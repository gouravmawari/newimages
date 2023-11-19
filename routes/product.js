const middleware_multer = require("../middleware/multer")
const User = require("../model");
const express = require("express")
const Router = express.Router();


Router.post("/register",middleware_multer,async (req,res)=>{
    const {username,password} = req.body;
    try{
        const user =  new User({username,password,image:{name:req.file.filename, path:"/space/"}});
        await user.save();
        return res.status(200).json({message:"file has been created"})
    }catch(error){
        return res.status(500).json(error)
    }
})

Router.post("/download",async(req,res)=>{
    const {post_owner_id,post_id} = req.body;
    try{
        const owner = await User.findById(post_owner_id);
        if(!owner){
            return res.status(500).json({message:"profile doesnot exist"})
        }
        const post = await owner.image.id(post_id);
        if(!post){
            return res.status(500).json({message:"image does not exist"})
        }
        const filename = post.name;
        const filePath = path.resolve(__dirname,'space',filename)
        return res.download(filePath)

    }catch(error){
        return res.status(500).json(error)
    }
})


Router.post("/login",async(req,res)=>{
    const {username,password} = req.body
    try{
        const user =  await User.compare({username,password});
        res.status(200).json(user)
    }catch(error){
        console.log(error);
        return res.status(500).json(error)
    }
})

Router.post("/upload" ,middleware_multer, async (req, res) => {
    const { user_id } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            {
                _id: user_id
            }, {
            $push: {
                image: { name: req.file.filename, path: "/Space/" }
            }
        }
        )
        return res.status(200).json({messsage:"photo uploaded"})
    }
    catch (err) {
        return res.status(505).json(err);
    }
})
module.exports = Router
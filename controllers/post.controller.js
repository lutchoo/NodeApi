const PostModel = require('../models/post.model');


exports.readPost = async (req,res)=>{
    try{
        const posts = await PostModel.find({}).sort({ createdAt: -1 });
        res.status(201).json(posts);
    }
    catch(err){
        console.log(err)
    }
}

exports.createPost = async(req,res)=>{
    const {posterId, message,picture,video,} =req.body
    try{
        const newPost = await PostModel.create({posterId,message,picture,video});
        res.status(201).json(newPost)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}

exports.deletePost = async (req,res)=>{
    try{
         await PostModel.findByIdAndDelete({_id:req.params.id});
        res.status(200).send('post deleted');

    }catch(err){
        console.log(err)
    }
}

exports.commentPost = async (req,res)=>{
    const {commenterId,commenterPseudo,text}=req.body
    try{
        const comment = await PostModel.findByIdAndUpdate({_id:req.params.id},{$push:{comments:{commenterId,commenterPseudo,text,timestamps: new Date().getTime()}}},{new:true});
        res.status(201).json(comment)

    }catch(err){
        console.log(err);
        
    }
}
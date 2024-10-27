const Usermodel = require('../models/user.model');


exports.getUserById = async (req,res)=>{
    try{
        const user = await Usermodel.findById(req.params.id).select("-password");
        console.log('user',user)
        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
        res.status(404).send('user not found')
    }
}

exports.updateUserBio = async (req, res)=>{
    const {bio} = req.body;
    try{
        const user = await Usermodel.findOneAndUpdate({_id:req.params.id}, {bio}, {new:true}).select('-password');
        console.log(user);
        res.status(201).json(user)
    }
    catch(err){
        console.log(err);
        res.status(404).send('user not found')
    }
}

exports.updateUserPseudo = async (req,res)=>{
    const {pseudo} =req.body;
    try{
        const user = await Usermodel.findOneAndUpdate({_id:req.params.id},{pseudo}, {new:true}).select('-password');
        res.status(201).json(user);
    }
    catch(err){
        console.log(err);
        res.status(404).send('user not found')
    }
}
exports.deleteUser = async (req,res)=>{
    try{
        await Usermodel.findOneAndDelete({_id:req.params.id});
        res.status(200).send('user deleted');
    }
    catch(err){
        console.log(err);
        res.status(404).send('user not found')
    }
}

exports.follow = async (req,res)=>{
    const {following} =req.body
    try{
        const user = await Usermodel.findByIdAndUpdate({_id:req.params.id},{$addToSet :{following}},{new:true}).select('-password');
        // res.status(200).json(user.following);
        if(user){
            const followers = await Usermodel.findByIdAndUpdate({_id:following}, {$addToSet:{followers:req.params.id}},{new:true}).select('-password');
            res.status(200).json(user);
        }
    }
    catch(err){
        console.log(err);
        res.status(404).send('user not found')
    }
}

exports.unfollow = async(req,res)=>{
    const {following}= req.body
    try{
        const user = await Usermodel.findByIdAndUpdate({_id:req.params.id}, {$pull:{following:following}},{new:true});
        if(user){
            const followers = await Usermodel.findByIdAndUpdate({_id:following},{$pull:{followers:req.params.id}});
            res.status(200).json(user)
        }

    }catch(err){
        console.log(err)
        res.status(404).send('user not found')
    }
}
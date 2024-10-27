const Usermodel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const createToken = (Id)=>{
//     const token = jwt.sign({id:Id},"secrettoken",{expiresIn: "1h"})
//     return token;
// }

exports.register = async ( req, res) =>{
    const {pseudo, email, password} =req.body;

    try{
        const user = await Usermodel.create({pseudo,email,password});
        res.status(201).json({user: user._id})
    }
    catch(err){
        res.status(400).send(err)
    }
}

exports.login = async(req, res) =>{
    const {email, password}= req.body;
    // console.log('Request Body:', req.body);
    try{
        const user = await Usermodel.findOne({email});
        if(user){
            //  console.log({user})
            const match = await bcrypt.compare(password, user.password)
            if(match){
                console.log(match);
                // const token = createToken(user._id);
                // console.log('tototoken', token);
                const token = jwt.sign(
                    {data: user._id}, 
                    process.env.TOKEN, 
                    { expiresIn: '1h' });;
                console.log('Totoken',token);
                // res.status(201).send(token);
                res.cookie('jwt',token, { maxAge: 900000, httpOnly: true })
                res.status(200).json({ user: user._id});
            }else{
                console.log('password doesnt match');
                res.status(401).send('password doesnt match')
            }
        }else{
            console.log('email doesnt match');
            res.status(401).send('email doesnt match')
        }   
    }
    catch(err){
        res.status(200).send(err)
    }
}

exports.logout = (req, res) =>{
    res.cookie('jwt','',{maxAge: 1});
    res.status(200).send('user disconect');
}
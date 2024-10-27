const mongoose = require('mongoose');
const{Schema} = mongoose;
const validator =require('validator');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
pseudo:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    minLength:2,
    maxLength:25,
},
email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    validate:validator.isEmail
},
password:{
    type:String,
    required:true,
    trim:true,
    minLength:8,
    maxLength:1024,
    validate: {
       validator: validator.isStrongPassword,
      message:'password must containt uppercase, number and special charater'
    }
},
bio:{
    type:String,
    maxLength:1024,
    default:""
},
picture:{
    type:String,
    default:"",
},
followers:{
    type:[String]
},
following:{
    type:[String]
},
likes:{
    type:[String]
},
},
{timestamps:true,}
);

userSchema.pre('save', async function(next){
    const saltRounds = 10;
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        console.log(salt);

        this.password = await bcrypt.hash(this.password, salt);
        console.log(this.password);
        next();

    }catch(err){
        console.log(err);
        next();
    }   
});

// userSchema.statics.login = async function(Email ,password){
//    try{
//     const user = await Usermodel.findOne({email: Email});
//     if(user){
//         const match = await bcrypt.compare(password, user.password);
//             if(match){
//                 console.log(match);
//                 return user;
//             }
//             throw Error('password doesnt match');    
//     }
//     throw Error('email doesnt match');
//    }
//    catch(err){
//     console.log(err)
//    }
// }


const Usermodel = mongoose.model('user', userSchema);

module.exports = Usermodel;
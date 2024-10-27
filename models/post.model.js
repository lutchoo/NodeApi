const mongoose = require('mongoose');
const { Schema } = mongoose;

const postShema = new Schema({
    posterId:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        maxLength:1024,
        trim:true,
    },
    picture:{
        type:String,
    },
    video:{
        type:String,
    },
    likers:{
        type:[String],
    },
    comments:{
        type:[{
            commenterId:String,
            commenterPseudo:String,
            text:String,
            timestamp:Number,
        }],
    },
},
{
    timestamps:true,
});

const PostModel = mongoose.model('post', postShema);

module.exports = PostModel;
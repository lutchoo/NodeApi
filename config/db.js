const mongoose = require('mongoose');

async function connectDB (){
    try{
        await mongoose.connect(process.env.URI);
        console.log('connect to mongo db');
    }
    catch(err){
        console.log('failled to connect',(err))
    }
}

connectDB();
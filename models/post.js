const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:2,
        maxlength:150
    },
    body:{
        type:String,
        required: true,
        minLength:2,
        maxLength:2000
    },

    picture:{
        data:Buffer,
        contentType:String
    },

    //relationship user-schema
    postedBy:{
        type: ObjectId,
        ref:"User" //ref to User model
    },

    created:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Post", postSchema);
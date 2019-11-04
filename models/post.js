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
        minlength: 2,
        maxlength: 2000
    },

    photo:{
        type:Buffer,
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
const mongoose = require("mongoose");
const uuidv1 = require('uuid/v1');
const crypto = require("crypto");
const { ObjectId } =mongoose.Schema;

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true
    },

    email:{
        type:String,
        trim:true,
        required:true
    },

    passwd_hash:{
        type:String,
        required:true
    },

    salt:String,

    created:{
        type:Date,
        default:Date.now
    },
    picture:{
        data:Buffer,
        contentType:String
    },
    about:{
        type:String,
        trim:true
    },
    following:[{
        type:ObjectId,
        ref:'User'
    }],
    followers:[{
        type:ObjectId,
        ref:'User'
    }],
    updated:Date

});


//virtual field

userSchema.virtual('password').set(function(password){

    this._password = password
    this.salt = uuidv1()

    this.passwd_hash = this.encryptPasswd(password)
}).get(function(){

    return this._password
});


userSchema.methods ={
    encryptPasswd:function (password) {
        if(!password) return "";

        try{
            return crypto.createHmac('sha256',this.salt).update(password)
                .digest('hex');

        }catch(err){
            return "";
        }
    },

    authenticate:function(plaintxt){

        return this.encryptPasswd(plaintxt) === this.passwd_hash;
    }
}

module.exports=mongoose.model("User" , userSchema);

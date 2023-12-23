// import mongoose, {Schema} from "mongoose";
// import {ObjectId} from "bson"


const mongoose = require('mongoose');
const validator =require('validator')


const userSchema = new mongoose.Schema({
    // id:{type: ObjectId},
    idUser:{type: String, require: true},
    name:{type: String , require:true,
        validate:{
            validator:(value) => value.length >3,
            message:'User name must at least 3 chars!'
        }},
    email: {
        type:String, require:true,
        validate:{
            validator:(value) => validator.isEmail(value),
            message:'Email is incorrect format!'
        }
    },
    role:{
        type:String,
        required:true        
    }
},{
        autoCreate:false,
        autoIndex:true
    });

    module.exports= mongoose.model('User', userSchema, 'User')



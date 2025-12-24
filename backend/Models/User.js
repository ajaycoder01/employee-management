const mongoose = require('mongoose')
// schema definition for user model 
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
      role: {                                          
      type: String,
      enum: ["admin", "employee"],
      default: "employee"
    }}, { timestamps: true});

const UserModel = mongoose.model('users',userSchema);
module.exports = UserModel;


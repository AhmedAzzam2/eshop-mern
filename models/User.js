const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true 
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    imageUrl: {
        type: String 
    },
    googleId: {
        type: String 
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }

},
{timestamps: true}
); 

//creating virtuals
userSchema.virtual('id').get(function () {
    // id must be a string with number like p01, p02, etc how should I do it? 
    // I want to create a unique id for each product 
    // get the last id from the database and add 1 to it
    
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

module.exports= mongoose.model("User",userSchema);
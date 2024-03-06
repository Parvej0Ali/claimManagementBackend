const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]

    },
    password: {
        type: String,
        required: [true, "Please Enter Your Passowrd"]
    },

    userName: {
        type: String,
        required: true,
        unique: [true, "Enter a unique username"]
    },

    role: {
        type: String,
        default: 'policyHolder',
    },

    policies: [{
        policy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Policy'
        },
        leftAmount: {
            type: Number,
        }
    }],
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// userSchema.set('toJSON', { virtuals: true });
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.generateAccesToken=function(){
    return Jwt.sign(
        {
            _id:this._id,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIERY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return Jwt.sign(
        {
            _id:this._id,
            email:this.email
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIERY
        }
    )
}
module.exports = mongoose.model("User", userSchema);


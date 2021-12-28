const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const usersSchema = new mongoose.Schema({
    fullName : {
        type : String
    },
    email : {
        type : String
    },
    emailVerification : {
        verificationStatus :{
            type : String,
            default : "unverified"
        },
        verificationCode : {
            type : String
        },
        verificationTime : {
            type : Number
        }        
    },
    contact : {
        type : Number
    },
    password : {
        type : String
    },
    DOB : {
        type : String
    },
    userName : String,
    bio : {
        type : String,
        maxLength : 150
    },
    myTopics : [String],
    followers : [String],
    following : [String]
},{
    timestamps : true
})

usersSchema.statics.findByCredentials = async ( userCredential , password) => {
    try{
        var user;
        if(validator.isEmail(userCredential)){
            user = await User.findOne({ email : userCredential})
        } else if(validator.isMobilePhone(userCredential, "en-IN")){
            user = await User.findOne({ contact : userCredential})
        }

        if(!user) {
            throw new Error('Unable to login')
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            throw new Error('Unable to login')
        }
        return user
    } catch(e) {
        throw new Error("Unable to login")
    }   
}

usersSchema.methods.genVerificationDetails = async function (){
    var verifyStatus = {
        time : Date.now() + 6000000,
        code : crypto.randomBytes(20).toString('hex')
    }
    return verifyStatus;
}

usersSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

usersSchema.index({ userName : 1})

const User = mongoose.model("users", usersSchema);

module.exports = User
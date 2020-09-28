const crypto = require('crypto');
var mongoose = require('mongoose')
// import { v1 as uuidv1 } from 'uuid'
// or
const { v1: uuidv1 } = require('uuid');


var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique : true
    },
    userinfo: {
        type: String,
        trim : true
    },
    encry_password: {
        type: String,
        required : true
    },
    salt: String,
    role: {
        type: Number,
        default : 0
    },
    purchases: {
        type: Array,
        default : []
    }
}, { timestamps : true }
)

userSchema.virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = uuidv1()
        this.encry_password = this.encryptPassword( password )
    })
    .get(function(){
        return this._password
    })    

userSchema.methods = {

    authenticate: function (plainPass) {
        return this.encryptPassword(plainPass) === this.encry_password
    },

    encryptPassword: function (plainPass) {
        if (!plainPass) return '' //returning empty string means mongodb wont store empty string as pass so it will give error. 
        try {
            return crypto.createHmac('sha256', this.salt)
                   .update( plainPass )
                   .digest('hex');
        } catch (error) {
            return ''
        }
    }
}
 
module.exports = mongoose.model( 'User', userSchema )
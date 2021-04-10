const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;


const User = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        required:true,
    },
});

User.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

User.set('toJSON', {
    transform : (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

User.methods.generateToken = function() {
    this.token = nanoid(5);
};

User.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const UserSchema = mongoose.model('UserSchema', User);
module.exports = UserSchema;


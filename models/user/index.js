const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: "Email must be valid",
        }
    },
    photo: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'PasswordConfirm is required'],
        validate: {
            validator: function(passConfirm){
                return passConfirm === this.password;
            },
            message: 'The passwords must be equals'
        }
    },
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){return next()}

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword = async function(candidatePass, userPass){
    return await bcrypt.compare(candidatePass, userPass);
}

module.exports = mongoose.model("user", userSchema);
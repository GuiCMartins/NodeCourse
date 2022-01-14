const mongoose = require('mongoose');
const validator = require('validator')

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
            validator: validator.email,
            message: "Email must be valid",
        }
    },
    photo: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'PasswordConfirm is required']
    },
});

module.exports = mongoose.model("user", userSchema);
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'User Name'],
    },
    email: {
        type: String,
        required: [true, 'Add email address'],
        unique:[true, 'Email address already taken']
    },
    password: {
        type: String,
        required: [true, 'Add password'],
    },
}, {
    timestamps: true,
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
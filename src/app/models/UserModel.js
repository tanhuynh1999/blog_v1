const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: '',
        required: true
    },
    image: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nameView: {
        type: String,
        default: '',
        required: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateEdit: {
        type: String,
        default: Date.now,
        required: true
    },
    dateLogin: {
        type: String,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model("User", User)
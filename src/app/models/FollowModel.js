const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Follow = new Schema({
    title: {
        type: String,
        required: true
    },
    describe: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    idBlog: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Follow", Follow)
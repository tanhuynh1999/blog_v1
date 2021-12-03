const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reply = new Schema({
    idBlog: {
        type: String,
        required: true
    },
    idComment: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    content: {
        type: String,
        maxLength: 800,
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateEdit: {
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
    titleBlog: {
        type: String,
        required: true
    },
    contentComment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Reply", Reply)
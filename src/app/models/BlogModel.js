const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema({
    title: {
        type: String,
        required: true
    },
    describe: {
        type: String,
        default: 'Không có mô tả',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: '/content/images/no-image.png',
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
    view: {
        type: Number,
        default: 1
    },
    dateEdit: {
        type: Date,
        default: Date.now,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
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
    idAuthor: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Blog", Blog)
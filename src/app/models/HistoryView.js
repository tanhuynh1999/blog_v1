const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistoryView = new Schema({
    idBlog: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    idUser: {
        type: String,
        require: true
    },
    titleProduct: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    describe: {
        type: String,
        require: true
    },
    dateEdit: {
        type: Date,
        default: Date.now,
        require: true
    }
});

module.exports = mongoose.model("HistoryView", HistoryView)
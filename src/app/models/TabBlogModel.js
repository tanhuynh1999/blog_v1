const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TabBlog = new Schema({
    name: {
        type: String,
        required: true
    },
    idBlog: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("TabBlog", TabBlog)
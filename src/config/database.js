const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://blog:blog123@blog.acwgo.mongodb.net/blog?retryWrites=true&w=majority');
        console.log("Connect!");;
    } catch (e) {
        console.log("Not Connect!");
    }
}

module.exports = {
    connect
};
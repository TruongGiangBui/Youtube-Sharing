const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    videoId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true }
    },
    { timestamps: true }
);  

module.exports = mongoose.model('Post', Post);
import mongoose from 'mongoose'
const postSchema = new mongoose.Schema({
    entry: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    price:{
        type: Number,
        required: false,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,       
        ref: 'Comment', // Reference to the Comment model     
        required: false, 
        }],
})

module.exports = postSchema

// Path: server/Models/Post.js
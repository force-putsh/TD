"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    entry: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: false,
    },
    comments: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Comment', // Reference to the Comment model     
            required: false,
        }],
});
module.exports = postSchema;
// Path: server/Models/Post.js

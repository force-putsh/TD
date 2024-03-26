"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = require('../Models/Post');
const postModel = mongoose_1.default.model('posts', postSchema);
function getAllPosts(res) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield postModel.find().populate('comments').exec();
        console.log("Fetching data");
        res.send(data);
    });
}
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postData = {
            entry: req.body.entry,
            categories: req.body.categories,
            comments: req.body.comments,
            price: req.body.price
        };
        const newPost = new postModel(postData);
        const data = yield newPost.save();
        res.send(data);
    });
}
function getPostById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        let data = yield postModel.findById(id).populate('comments').exec();
        res.send(data);
    });
}
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const postData = {
            entry: req.body.entry,
            categories: req.body.categories,
            comments: req.body.comments,
            price: req.body.price
        };
        console.log(postData);
        let data = yield postModel.findByIdAndUpdate(id, { $set: postData }, { new: true });
        res.send(data);
    });
}
function sumPrice(res) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield postModel.aggregate([{ $group: { _id: null, total: { $sum: "$price" } } }]);
        console.log(data);
        res.send(data);
    });
}
function averagePrice(res) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield postModel.aggregate([{ $group: { _id: null, average: { $avg: "$price" } } }]);
        res.send(data);
    });
}
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        let data = yield postModel.findByIdAndDelete(id);
        res.send(data);
    });
}
module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    sumPrice,
    averagePrice
};

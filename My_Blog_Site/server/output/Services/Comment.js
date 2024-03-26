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
const commentSchema = require('./Comment');
const commentModel = mongoose_1.default.model('comments', commentSchema);
function getAllComments(res) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield commentModel.find();
        console.log(data);
        res.send(data);
    });
}
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const commentData = {
            comment_text: req.body.comment_text
        };
        const newComment = new commentModel(commentData);
        const data = yield newComment.save();
        res.send(data);
    });
}
function getCommentById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        let data = yield commentModel.findById(id);
        res.send(data);
    });
}
function updateComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const commentData = {
            comment_text: req.body.comment_text
        };
        let data = yield commentModel.findByIdAndUpdate(id, { $set: commentData }, { new: true });
        res.send(data);
    });
}
function deleteComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        let data = yield commentModel.findByIdAndDelete(id);
        res.send(data);
    });
}
module.exports = {
    getAllComments,
    createComment,
    getCommentById,
    updateComment,
    deleteComment
};

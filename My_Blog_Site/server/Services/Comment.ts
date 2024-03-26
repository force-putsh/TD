import mongoose from 'mongoose'
const commentSchema = require('./Comment')
const commentModel = mongoose.model('comments', commentSchema)

 async function getAllComments (res: { send: (arg0: any[]) => void; }) {
    let data = await commentModel.find();
    console.log(data);
    res.send(data);
  }
  
  async function   createComment(req: { body: { comment_text: any; }; }, res: { send: (arg0: any) => void; }) {
    const commentData = {
      comment_text: req.body.comment_text
  };
    const newComment = new commentModel(commentData)
    const data = await newComment.save()
    res.send(data) 
  }
  
  async function  getCommentById(req: { params: { id: any; }; }, res: { send: (arg0: any) => void; }) {
    const id = req.params.id
    let data = await commentModel.findById(id)
    res.send(data)
  }
  
  async function   updateComment(req: { params: { id: any; }; body: { comment_text: any; }; }, res: { send: (arg0: any) => void; }) {
    const id = req.params.id
    const commentData = {
      comment_text: req.body.comment_text
  };
    let data = await commentModel.findByIdAndUpdate(id, {$set: commentData}, {new:true})
    res.send(data);
}
  
async function   deleteComment(req: { params: { id: any; }; }, res: { send: (arg0: any) => void; }) {
    const id = req.params.id
    let data = await commentModel.findByIdAndDelete(id)
    res.send(data)
  }

  module.exports = {
    getAllComments,
    createComment,
    getCommentById,
    updateComment,
    deleteComment
};
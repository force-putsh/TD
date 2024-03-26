import mongoose from 'mongoose'
const postSchema = require('../Models/Post')

const postModel = mongoose.model('posts', postSchema)

 async function getAllPosts ( res: { send: (arg0: Omit<any, never>[]) => void }) {
    let data = await postModel.find().populate('comments').exec()
    console.log("Fetching data")
    res.send(data)
  }
  
  async function   createPost(req: { body: { entry: any; categories: any; comments: any; price: any } }, res: { send: (arg0: any) => void }) {
    const postData = {
      entry: req.body.entry,
      categories: req.body.categories,
      comments: req.body.comments,
      price: req.body.price
  };
    const newPost = new postModel(postData)
    const data = await newPost.save()
    res.send(data) 
  }
  
  async function  getPostById(req: { params: { id: any } }, res: { send: (arg0: any) => void }) {
    const id = req.params.id
    let data = await postModel.findById(id).populate('comments').exec()
    res.send(data)
  }
  
  async function   updatePost(req: { params: { id: any }; body: { entry: any; categories: any; comments: any; price: any } }, res: { send: (arg0: any) => void }) {
    const id = req.params.id
    const postData = {
      entry: req.body.entry,
      categories: req.body.categories,
      comments: req.body.comments,
      price: req.body.price
  };
  console.log(postData)
    let data = await postModel.findByIdAndUpdate(id, {$set: postData}, {new:true})
    res.send(data);
}

async function sumPrice( res: { send: (arg0: any[]) => void }) {
  let data = await postModel.aggregate([{$group: {_id: null, total: {$sum: "$price"}}}])
  console.log(data)
  res.send(data)
}

async function averagePrice(res: { send: (arg0: any[]) => void }) {
  let data = await postModel.aggregate([{$group: {_id: null, average: {$avg: "$price"}}}])
  res.send(data)
}
  
async function   deletePost(req: { params: { id: any } }, res: { send: (arg0: any) => void }) {
    const id = req.params.id
    let data = await postModel.findByIdAndDelete(id)
    res.send(data)
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
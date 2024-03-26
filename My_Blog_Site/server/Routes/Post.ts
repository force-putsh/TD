import express from 'express';
const router = express.Router();
require('dotenv').config();


// Import controllers
const PostController = require('../Services/Post');

// Define routes
router.get('/', PostController.getAllPosts);
router.post('/', PostController.createPost);
router.get('/:id', PostController.getPostById);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);
router.get('/post/sum', PostController.sumPrice);
router.get('/post/average', PostController.averagePrice);

module.exports = router;
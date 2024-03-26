const express = require('express');
const router = express.Router();

// Import controllers
const CommentController = require('../Services/Comment');

// Define routes
router.get('/', CommentController.getAllComments);
router.post('/', CommentController.createComment);
router.get('/:id', CommentController.getCommentById);
router.put('/:id', CommentController.updateComment);
router.delete('/:id', CommentController.deleteComment);

module.exports = router;
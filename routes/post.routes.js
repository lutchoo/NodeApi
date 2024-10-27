const express =require('express');
const router = express.Router();
const postController = require('../controllers/post.controller')

router.get('/', postController.readPost);
router.post('/create', postController.createPost);
router.delete('/:id', postController.deletePost);
router.patch('/comment-post/:id', postController.commentPost)

module.exports = router;
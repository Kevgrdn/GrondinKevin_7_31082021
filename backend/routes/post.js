const express = require('express');
const router = express.Router();

//Appelle le controller 
const postCtrl = require('../controllers/post')

//Middleware
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

//Routes : 
router.get('',  postCtrl.getAllPosts)
router.post('', multer, postCtrl.createPost)
router.post('/:id/commentary', postCtrl.createCommentary)
router.post('/:id/like', postCtrl.likeOrDislikePost)
router.put('/:id', auth, multer, postCtrl.updateOnePost)
router.delete('/:id', auth, postCtrl.deleteOnePost)


module.exports = router;


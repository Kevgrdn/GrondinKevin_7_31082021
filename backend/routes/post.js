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
router.get('/:id/commentary', postCtrl.getCommentaries)
router.put('/:id/like', postCtrl.likeOrDislikePost)
router.put('/:id',  multer, postCtrl.updateOnePost)
router.delete('/:id',  postCtrl.deleteOnePost)


module.exports = router;


const express = require('express');
const router = express.Router();

//Appelle le controller 
const postCtrl = require('../controllers/post')

//Middleware
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

//Routes : 
router.get('', auth,   postCtrl.getAllPosts)
router.post('', auth,  multer, postCtrl.createPost)
router.post('/:id/commentary', auth,  postCtrl.createCommentary)
router.get('/:id/commentary',auth,  postCtrl.getCommentaries)
router.put('/:id/like', auth, postCtrl.likeOrDislikePost)
router.put('/:id',auth,  multer, postCtrl.updateOnePost)
router.delete('/:id', auth, postCtrl.deleteOnePost)


module.exports = router;


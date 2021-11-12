const express = require('express');
const router = express.Router();


//Appelle le controller
const userCtrl = require('../controllers/user')


//Appelle le middleware d'authentification
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


//Route : 
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/users', auth,  userCtrl.getAllUsers)
router.get('/users/:id',auth, userCtrl.getOneUser)
router.put('/users/:id', auth, multer, userCtrl.updateUser)
router.put('/users/:id/password', auth, userCtrl.updateUserPassword)
router.put('/users/:id/photo', auth, multer,  userCtrl.updatePhoto)
router.put('/users/:id/name', auth, userCtrl.updateName)
router.put('/users/:id/firstname', auth, userCtrl.updateFirstName)
router.put('/users/:id/email', auth, userCtrl.updateMail)
router.delete('/users/:id', auth, userCtrl.deleteUser)



module.exports = router;



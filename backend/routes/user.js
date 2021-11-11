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
router.get('/users', userCtrl.getAllUsers)
router.get('/users/:id', userCtrl.getOneUser)
router.put('/users/:id',multer, userCtrl.updateUser)
router.delete('/users/:id', userCtrl.deleteUser )


module.exports = router;



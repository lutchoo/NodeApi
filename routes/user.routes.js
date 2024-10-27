const express =require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

//auth
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout',authController.logout)

//user
router.get('/:id', userController.getUserById);
router.put('/bio/:id', userController.updateUserBio);
router.put('/pseudo/:id', userController.updateUserPseudo);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow)

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const handleMiddleware = require('../middlewares/handleMiddleware');
const userValidation = require('../validation/userValidation');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.get('/me',AuthMiddleware,userController.me);
router.post('/login',userValidation.login,handleMiddleware,userController.login);
router.post('/register',userValidation.register,handleMiddleware,userController.register);
router.post('/logout',userController.logout);
router.patch('/emailAndName/update',AuthMiddleware,userValidation.emailAndName,handleMiddleware,userController.updateEmailAndName);
router.patch('/password/update',AuthMiddleware,userValidation.password,handleMiddleware,userController.updatePassword);
router.patch('/profilePicture/update',AuthMiddleware,userValidation.profilePicture,handleMiddleware,userController.updateProfilePicture);
router.post('/:userId/favorites/:recipeId',userController.addFavorites);
router.delete('/:userId/favorites/:recipeId',userController.removeFavorites);
router.get('/:userId/favorites',userController.getFavRecipes);

module.exports = router;
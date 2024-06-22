const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/dashboard',adminController.get);
router.get('/recipes',adminController.getRecipes);
router.delete('/user/:userId',adminController.deleteUser);
router.delete('/recipes/:recipeId',adminController.deleteRecipe);

module.exports = router;
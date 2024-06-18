const express = require('express');
const recipesController = require('../controllers/recipesController');
const handleMiddleware = require('../middlewares/handleMiddleware')
const router = express.Router();
const { body } = require('express-validator');

router.get('',recipesController.index);
router.post('',[
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('ingredients').notEmpty().withMessage('Ingredients is required').isArray({ min:2 }).withMessage('Ingredients must have at least two'),
    body('photo_url').notEmpty().withMessage('Photo is required')
],handleMiddleware,recipesController.store);
router.get('/:id',recipesController.show);
router.patch('/:id',recipesController.update);
router.delete('/:id',recipesController.destroy);


module.exports = router;
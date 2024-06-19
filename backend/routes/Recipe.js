const express = require('express');
const recipesController = require('../controllers/recipesController');
const handleMiddleware = require('../middlewares/handleMiddleware')
const router = express.Router();
const { body } = require('express-validator');
const { default: mongoose } = require('mongoose');

router.get('',recipesController.index);
router.post('',[
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('ingredients').notEmpty().withMessage('Ingredients is required').isArray({ min:2 }).withMessage('Ingredients must have at least two'),
    body('photo_url').notEmpty().withMessage('Photo is required'),
    body('user').notEmpty().withMessage('User Id is required').custom((value) => {
        if(!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('User Id must be valid!')
        }
        return true;
    })
],handleMiddleware,recipesController.store);
router.get('/:id',recipesController.show);
router.patch('/:id',recipesController.update);
router.delete('/:id',recipesController.destroy);


module.exports = router;
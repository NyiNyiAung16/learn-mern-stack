const { body } = require('express-validator');
const mongoose = require('mongoose');

const commentValidation = {
    default: [
        body('text').notEmpty().withMessage('Text is required'),
        body('user').notEmpty().withMessage('User Id is required').custom((value) => {
            if(!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('User Id must be valid!')
            }
            return true;
        })
    ]
};

module.exports = commentValidation;
const { body } = require('express-validator');
const mongoose = require('mongoose');
const User = require('../model/User');

const commentValidation = {
    default: [
        body('text').notEmpty().withMessage('Text is required'),
        body('user').notEmpty().withMessage('User Id is required').custom(async(value) => {
            if(!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('User Id must be valid!')
            }
            let user = await User.findById(value);
            if(!user) {
                throw new Error("User Id is invalid!")
            }
            return true;
        })
    ]
};

module.exports = commentValidation;
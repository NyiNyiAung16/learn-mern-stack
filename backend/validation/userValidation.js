const { body } = require('express-validator');
const User = require('../model/User');
const bcrypt = require('bcrypt');

const userValidation = {
    register: [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please enter a valid email address')
        .custom(async value => {
            const user = await User.findOne({email: value});
            if (user) {
                throw new Error('E-mail already in use');
            }
        }),
        body('password').notEmpty().withMessage('Password is required').isLength({min:7}).withMessage('Password must be at least 7 characters long')
    ],
    login: [
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please enter a valid email address'),
        body('password').notEmpty().withMessage('Password is required').isLength({min:7}).withMessage('Password must be at least 7 characters long')
    ],
    emailAndName: [
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please enter a valid email address'),
        body('name').notEmpty().withMessage('Name is required')
    ],
    password: [
        body('password')
        .notEmpty()
        .withMessage('Password is required')
        .custom(async(value,{req}) => {
            let user = await User.findOne(req.user._id);
            let IsMatchOldPassword = await bcrypt.compare(req.body.oldPassword,user.password);
            if(!IsMatchOldPassword) {
                throw new Error('Old Password does not match')
            }
            return true;
        })
        .isLength({min:7}).withMessage('Password must be at least 7 characters long')
    ],
    profilePicture: [
        body('photo_url').notEmpty().withMessage('Photo is required')
    ]
}

module.exports = userValidation;
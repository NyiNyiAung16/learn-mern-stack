const { body } = require("express-validator");
const upload = require("../helpers/upload");

const uploadValidation = [
    upload.single('photo_url'),
    body('photo_url').custom((value,{req}) => {
         if(!req.file.mimetype.startsWith("image")){
            throw new Error('Photo must be image')
        }
        return true;
    })
]
module.exports = uploadValidation;
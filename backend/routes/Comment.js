const express = require('express');
const CommentController = require('../controllers/CommentController');
const commentValidation = require('../validation/commentValidation');
const router = express.Router();
const handleMiddleware = require('../middlewares/handleMiddleware');

router.get('',CommentController.get);
router.post('',commentValidation.default,handleMiddleware,CommentController.store);
router.patch('/:id',commentValidation.default,handleMiddleware,CommentController.update);
router.delete("/:id",CommentController.destroy);


module.exports = router;
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: {
        type:String,
        required:true
    },
    user:{
        type:  mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    recipe_id: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

module.exports = mongoose.model('Comment',CommentSchema);
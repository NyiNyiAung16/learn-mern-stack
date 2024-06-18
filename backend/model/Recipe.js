const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    photo_url: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    ingredients: {
        type:Array,
        required:true
    },
    user_id: mongoose.Schema.Types.ObjectId
},{ timestamps:true });

module.exports = mongoose.model('Recipe',RecipeSchema);
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
    popular: {
        type:Number,
        default:0
    },
    user:{
        type:  mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
},{ timestamps:true });

module.exports = mongoose.model('Recipe',RecipeSchema);
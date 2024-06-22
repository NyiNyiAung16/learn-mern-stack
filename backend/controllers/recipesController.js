const Recipe = require('../model/Recipe');
const mongoose = require('mongoose');
const fileUnlink = require('../helpers/fileUnlink');
const User = require('../model/User');
const emailQueue = require('../queues/emailQueue');

const recipesController = {
    index: async(req,res) => {
        let limit = 6;
        let page = parseInt(req.query.page) || 1;
         
        try{
            let recipes = await Recipe
            .find()
            .populate('user')
            .skip((page - 1) * limit) // 3 - 1 , 2 * 5
            .limit(limit)
            .sort({createdAt: -1});

            let totalPages = await Recipe.countDocuments();
            let totalPagesCount =   Math.ceil(totalPages/limit);
            

            let links = {
                nextPage: page == totalPagesCount ? false : true,
                previousPage: page == 1 ? false : true,
                currentPage: page,
                loopableLinks: []
            };

            for (let index = 1; index <= totalPagesCount; index++) {
                links.loopableLinks.push({ number: index});
            }

            let response = {
                data: recipes,
                links
            }

            return res.json(response);
        }catch(e) {
            return res.status(500).json({error:'internet server error!'})
        }   
    },
    show: async (req,res) => {
       try{
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({error:'Id is invalid!'});
            }
            let recipe = await Recipe.findById(id);
            if(!recipe) {
                return res.status(404).json({error:'Recipe not found!'});
            }
            return res.json(recipe);
       }catch(e) {
            return res.status(500).json({error: 'internet server error!'});
       }
    },
    store: async (req,res) => {
        try{
            const recipe = await Recipe.create({...req.body});
            if(!recipe) {
                throw new Error("Can't Create Recipe!!");
            }
            let users = await User.find({},['email']);
            let emails = users.map((user) => user.email).filter((email) => email !== req.user.email);
            emailQueue.add({
                view: 'email',
                data: {
                    name: req.user.name,
                    recipe
                },
                from: req.user.email,
                to:emails,
                subject: `${req.user.name} is created a new recipe called ${recipe.title}`
            });
            return res.json(recipe);
        }catch(e) {
            return res.status(500).json({errorMsg:e.message});
        }
    },
    destroy: async(req,res) => {
        try{
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({error:'Id is invalid!'});
            }
            let recipe = await Recipe.findByIdAndDelete(id);
            if(!recipe) {
                return res.status(404).json({error:'Recipe not found!'});
            }
            await fileUnlink(recipe.photo_url);
            return res.json(recipe);
       }catch(e) {
            return res.status(500).json({error: 'internet server error!'});
       }
    },
    update: async(req,res) => {
        try{
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({error:'Id is invalid!'});
            }
            let oldRecipe = await Recipe.findByIdAndUpdate(id,{...req.body});
            let newRecipe =  await Recipe.findById(id);
            if(!oldRecipe) {
                return res.status(404).json({error:'Recipe not found!'});
            }
            if(oldRecipe.photo_url != newRecipe.photo_url){
                await fileUnlink(oldRecipe.photo_url);
            }
            return res.json(oldRecipe);
       }catch(e) {
            return res.status(500).json({error: 'internet server error!'});
       }
    },
};

module.exports = recipesController;
const { default: mongoose } = require("mongoose");
const Recipe = require("../model/Recipe");
const User = require("../model/User");
const fileUnlink = require("../helpers/fileUnlink");

const adminController = {
  get: async (req, res) => {
    try {
      let search = req.query.search || "";
      
      let users = await User.find({
        name: { $regex: search, $options: "i" },
      }).sort({ createdAt: -1 });

      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  getRecipes: async(req,res) => {
    try {
      let recipeSearch = req.query.recipeSearch || "";

      let recipes = await Recipe.find({
        $or: [
          { title: { $regex: recipeSearch, $options: "i" } },
          { "user.name": { $regex: recipeSearch, $options: "i" } },
        ],
      }) .populate('user').sort({ createdAt: -1 });

      return res.status(200).json(recipes);
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  deleteUser: async(req,res) => {
    try {
      let userId = req.params.userId;
      if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'User id is not valid' });
      }
      let user = await User.findByIdAndDelete(userId);
      if(!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if(user.photo_url != 'default.jpg') {
        await fileUnlink(user.photo_url);
      }
      return res.status(200).json({ message: 'User deleted successfully',user });
    }catch(e) {
      return res.status(500).json({ error: e.message });
    }
  },
  deleteRecipe: async(req,res) => {
    try {
      let recipeId = req.params.recipeId;
      if(!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(400).json({ error: 'Recipe id is not valid' });
      }
      let recipe = await Recipe.findByIdAndDelete(recipeId);
      if(!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      if(recipe.photo_url != 'default.jpg') {
        await fileUnlink(recipe.photo_url);
      }
      return res.status(200).json({ message: 'recipe deleted successfully',recipe });
    }catch(e) {
      return res.status(500).json({ error: e.message });
    }
  },
};

module.exports = adminController;

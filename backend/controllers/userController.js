const User = require("../model/User");
const createToken = require("../helpers/createToken");
const bcrypt = require("bcrypt");
const fileUnlink = require("../helpers/fileUnlink");

const userController = {
  me: (req, res) => {
    return res.json(req.user);
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      let user = await User.login(email, password);
      let token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      }); //maxAge - seconds
      user.password = null;
      return res.json({ user, token });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
  register: async (req, res) => {
    try {
      const { name, email, password, photo_url } = req.body;
      let user = await User.register(name, email, password, photo_url);
      let token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      }); //maxAge - seconds
      user.password = null;
      return res.json({ user, token });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
  logout: (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    return res.json({ msg: "User is logged out" });
  },
  updateEmailAndName: async (req, res) => {
    try {
      let user = await User.findByIdAndUpdate(req.user._id, { ...req.body });
      return res.json(user);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  },
  updatePassword: async (req, res) => {
    try {
      let salt = await bcrypt.genSalt();
      let hashPassword = await bcrypt.hash(req.body.password, salt);
      let user = await User.findByIdAndUpdate(req.user._id, {
        password: hashPassword,
      });
      return res.json(user);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  },
  updateProfilePicture: async (req, res) => {
    try {
      let user = await User.findByIdAndUpdate(req.user._id, { ...req.body });
      if (user.photo_url != "default.jpg") {
        await fileUnlink(user.photo_url);
      }
      return res.json(user);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  },
  addFavorites: async (req, res) => {
    try {
      await User.updateOne(
        { _id: req.params.userId },
        { $addToSet: { fav_recipes: req.params.recipeId } }
      ); // $addToSet prevents duplicates
      return res.status(200).send('Add Favorite is successful');
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  removeFavorites: async (req, res) => {
    try {
      await User.updateOne(
        { _id: req.params.userId },
        { $pull: { fav_recipes: req.params.recipeId } }
      );
      return res.status(200).send('Remove Favorite is successful');
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  getFavRecipes: async (req, res) => {
    try {
      let user = await User.findById(req.params.userId)
        .populate("fav_recipes")
        .exec();
      return res.status(200).json(user.fav_recipes);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
};

module.exports = userController;

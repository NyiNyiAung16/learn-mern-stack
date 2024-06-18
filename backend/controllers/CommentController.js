const { default: mongoose } = require("mongoose");
const Comment = require("../model/Comment");

const CommentController = {
  get: async (req, res) => {
    try {
      let comments = await Comment.find().populate('user').sort({createdAt: -1});
      return res.status(200).json(comments);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
  store: async (req, res) => {
    try {
      let comment = await Comment.create({ ...req.body });
      if (!comment) {
        throw new Error("Can't create comment");
      }
      return res.status(200).json(comment);
    } catch (e) {
      return res.status(500).json({ errors: { text : { msg: e.message }} });
    }
  },
  update: async (req, res) => {
    try {
      let comment_id = req.params.id;
      let user = req.user;
      if(!mongoose.Types.ObjectId.isValid(comment_id)){
        throw new Error('Comment Id must be valid!')
      }
      let comment = await Comment.findById(comment_id);
      if(!comment.user.equals(user._id)){
        throw new Error("User is unauthorized");
      }
      let updatedComment = await Comment.findByIdAndUpdate(comment_id, {
        ...req.body,
      });
      return res.status(200).json(updatedComment);
    } catch (e) {
      return res.status(500).json({ errors: { text : { msg: e.message }} });
    }
  },
  destroy: async (req, res) => {
    try {
      let comment_id = req.params.id;
      let user = req.user;
      if(!mongoose.Types.ObjectId.isValid(comment_id)){
        throw new Error('Comment Id must be valid!')
      }
      let comment = await Comment.findById(comment_id);
      if(!comment.user.equals(user._id)){
        throw new Error("User is unauthorized");
      }
      let destroyComment = await Comment.findByIdAndDelete(comment_id);
      return res.status(200).json(destroyComment);
    } catch (e) {
      return res.status(500).json({ errors: { text : { msg: e.message }} });
    }
  },
};

module.exports = CommentController;

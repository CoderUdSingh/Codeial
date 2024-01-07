const Post = require("../models/Post_Schema");

exports.createPost = (req, res) => {
  Post.create({ content: req.body.content, user: req.user._id });
  return res.redirect("back");
};

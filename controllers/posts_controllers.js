const Post = require("../models/Post_Schema");
const Comment = require("../models/Comment_Schema");

exports.createPost = (req, res) => {
  Post.create({ content: req.body.content, user: req.user._id });
  return res.redirect("back");
};

exports.destroy = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (post.user == req.user.id) {
        await Post.deleteOne({ user: req.user.id });
        await Comment.deleteMany({ post: req.params.id });
      }

      return res.redirect("back");
    }
  } catch (err) {
    console.error(err);
  }
  res.redirect("back");
};

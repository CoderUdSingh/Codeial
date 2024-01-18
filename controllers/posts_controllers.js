const Post = require("../models/Post_Schema");
const Comment = require("../models/Comment_Schema");

exports.createPost = async (req, res) => {
  let post = await Post.create({
    content: req.body.content,
    user: req.user._id,
  });
  if (req.xhr) {
    return res.status(200).json({
      data: {
        post,
      },
      message: "Post Created",
    });
  }
  req.flash("success", "Post Created Successfully");
  return res.redirect("back");
};

exports.destroy = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (post.user == req.user.id) {
        await Post.deleteOne({ user: req.user.id });
        await Comment.deleteMany({ post: req.params.id });
        if (req.xhr) {
          return res.status(200).json({
            data: {
              post_id: req.params.id,
            },
            message: "Post Deleted",
          });
        }
        req.flash("success", "Post Deleted Successfully");
      }

      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "Unable to delete the post");
    console.error(err);
  }
  res.redirect("back");
};

const Comment = require("../models/Comment_Schema");
const Post = require("../models/Post_Schema");

exports.addComment = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      const newComment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      });

      post.comments.push(newComment);
      post.save();
      return res.redirect("back");
    } else {
      console.log(`Error in getting the post`);
    }

    res.redirect("back");
  } catch (err) {
    console.error(err);
  }
};

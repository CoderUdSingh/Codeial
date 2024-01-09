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

exports.destroyComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment && comment.user == req.user.id) {
      const postId = comment.post;
      await Comment.deleteOne({ _id: req.params.id });
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      return res.redirect("back");
    } else {
      res.redirect("back");
    }
  } catch (err) {
    console.error(err);
  }
  res.redirect("back");
};

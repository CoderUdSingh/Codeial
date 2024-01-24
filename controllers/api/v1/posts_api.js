const Post = require("../../../models/Post_Schema");
const Comment = require("../../../models/Comment_Schema");

exports.index = async (req, res) => {
  const postAndUserData = await Post.find({})
    .populate("user")
    .sort("-createdAt")
    .populate({ path: "comments", populate: { path: "user" } })
    .exec();

  return res.status(200).json({
    message: "Hello from the api",
    posts: postAndUserData,
  });
};

exports.destroy = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      await Post.deleteOne({ user: req.user.id });
      await Comment.deleteMany({ post: req.params.id });

      return res
        .status(200)
        .json({ message: "Post and Associated Comments Deleted Successfully" });
    } else {
      return res.status(401).json({ message: "You cant delete this post" });
    }
  } catch (err) {
    console.log(`This is the error in post_api.js ${err}`);
    return res
      .status(500)
      .json({
        message: "Internal Server Error or Unable to find post in the database",
      });
  }
};

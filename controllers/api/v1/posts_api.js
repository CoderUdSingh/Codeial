const Post = require("../../../models/Post_Schema");

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

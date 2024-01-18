const Post = require("../models/Post_Schema");
const User = require("../models/user_Schema");

exports.home = async (req, res) => {
  try {
    const postAndUserData = await Post.find({})
      .populate("user")
      .sort("-createdAt")
      .populate({ path: "comments", populate: { path: "user" } })
      .exec();

    const allUsers = await User.find({});

    return res.render("home", {
      title: "Home",
      posts: postAndUserData,
      all_users: allUsers,
    });
  } catch (err) {
    console.err(err);
  }
};

const Post = require("../models/Post_Schema");
const User = require("../models/user_Schema");

exports.home = async (req, res) => {
  try {
    const postAndUserData = await Post.find({})
      .populate("user")
      .populate({ path: "comments", populate: { path: "user"  } })
      .exec();

    return res.render("home", {
      title: "Home",
      posts: postAndUserData,
    });

    console.log(postData);
  } catch (err) {
    console.err(err);
  }
};

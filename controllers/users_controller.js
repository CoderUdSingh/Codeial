const User = require("../models/user_Schema");

exports.profile = (req, res) => {
  User.findById(req.params.id)
    .then((profileUser) => {
      return res.render("user_profile", {
        title: "Users",
        profile_user: profileUser,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Rendering Sign Up Page
exports.signUp = (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/users/profile");
  return res.render("user_sign_up", { title: "Users-Sign-Up" });
};

// Rendering Sign In Page
exports.signIn = (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/users/profile");
  return res.render("user_sign_in", { title: "Users-Sign-In" });
};

// Crating SignUp action
exports.create = (req, res) => {
  if (req.body.password != req.body.confirm_password)
    return res.redirect("back");

  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        User.create(req.body);
        return res.redirect("/users/sign-in");
      }
    })
    .catch((err) => console.log("Error in creating the user while signing up"));
};

exports.createSession = (req, res) => {
  res.redirect("/");
};

exports.destroySession = (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.error(err);
    }
    return res.redirect("/");
  });
};

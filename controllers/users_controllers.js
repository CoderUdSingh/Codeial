const User = require("../models/user_Schema");

// Profile Page Action

exports.profile = (req, res) => {
  return res.render("profile_page", { title: "Users" });
};

// Rendering Sign Up Page
exports.signUp = (req, res) => {
  return res.render("user_sign_up", { title: "Users-Sign-Up" });
};

// Rendering Sign In Page
exports.signIn = (req, res) => {
  return res.render("user_sign_in", { title: "Users-Sign-In" });
};

// Crating SignUp action
exports.create = (req, res) => {
  if (req.body.password != req.body.confirm_password)
    return res.redirect("back");

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        User.create(req.body);
        return res.redirect("/users/sign-in");
      }
    })
    .catch((err) => console.log("Error in creating the user while signing up"));
};

// Crating Signin action or Creating Session

exports.createSession = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        // If password does'nt match
        if (req.body.password != user.password) {
          return res.redirect("back");
        }
        // Handle Session Creation
        res.cookie("user_id", user.id);
        return res.redirect("/users/profile");
      } else {
        return res.redirect("back");
      }
    })
    .catch((err) => console.log("Error in finding the user while signing in"));
};

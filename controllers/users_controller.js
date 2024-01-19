const { fstat } = require("fs");
const User = require("../models/user_Schema");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AVATAR_PATH = path.join("/uploads/users/avatar");

// Configuring Multer

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + Date.now() + "." + ext);
  },
});

exports.uploadedAvatar = multer({ storage: multerStorage });

// Rendering Profile Page
exports.profile = async (req, res) => {
  try {
    const profileUser = await User.findById(req.params.id);

    return res.render("user_profile", {
      title: "Users",
      profile_user: profileUser,
    });
  } catch (err) {
    console.log(`This is the error ${err}`);
    return;
  }
};

//Updating profile information

exports.update = async (req, res) => {
  try {
    if (req.params.id == req.user.id) {
      let user = await User.findById(req.params.id);

      user.name = req.body.name;
      user.email = req.body.email;

      if (req.file) {
        user.avatar = AVATAR_PATH + "\\" + req.file.filename;
      }
      user.save();
      return res.redirect("back");
    } else {
      return res.status(401).send("unauthrised user");
    }
  } catch (err) {
    req.flash("error", "Unable to update the profile");
    return;
  }
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

////////////////////////////// SignIn Route Controller /////////////////////////////////
exports.createSession = (req, res) => {
  req.flash("success", "Logged in successfully");
  res.redirect("/");
};

///////////////// Directly Using Inside Route Function Now /////////////////////////////
// exports.destroySession = (req, res, next) => {
//   req.logOut((err) => {
//     if (err) {
//       return next(err);
//     }
//   });
//   req.flash("success", "You are logged out");
//   return res.redirect("/");
// };

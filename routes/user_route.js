const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");
const passport = require("passport");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);

router.post(
  "/update/:id",
  passport.checkAuthentication,
  usersController.uploadedAvatar.single("avatar"),
  usersController.update
);

router.get("/sign-in", usersController.signIn);
router.get("/sign-up", usersController.signUp);

router.post("/create", usersController.create);

////////////////////////////// SignIn Route /////////////////////////////////
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/sign-in",
    failureMessage: true,
  }),
  usersController.createSession
);

router.get("/sign-out", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out");
    return res.redirect("/users/sign-in");
  });
});

console.log("Users Router is working");

module.exports = router;

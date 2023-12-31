const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");
const passport = require("passport");

router.get("/profile", passport.checkAuthentication, usersController.profile);

router.get("/sign-in", usersController.signIn);
router.get("/sign-up", usersController.signUp);

router.post("/create", usersController.create);
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/sign-in",
    failureMessage: true,
  }),
  usersController.createSession
);

router.get("/sign-out", usersController.destroySession);

console.log("Users Router is working");

module.exports = router;

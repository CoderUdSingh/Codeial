const express = require("express");
const homeController = require("../controllers/home_controllers");
const router = express.Router();
const passport = require("passport");

console.log("Home Router is loaded");

router.get("/", passport.checkAuthentication, homeController.home);

router.use("/users", require("./user_route"));
router.use("/posts", require("./posts_route"));
router.use("/comments", require("./comment_route"));

module.exports = router;

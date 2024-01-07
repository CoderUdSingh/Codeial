const express = require("express");
const postController = require("../controllers/posts_controllers");
const router = express.Router();
const passport = require("passport");
router.post("/create", passport.checkAuthentication, postController.createPost);

module.exports = router;

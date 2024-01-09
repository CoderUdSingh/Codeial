const express = require("express");
const commentsController = require("../controllers/comments_controllers");
const router = express.Router();
const passport = require("passport");

router.post(
  "/create",
  passport.checkAuthentication,
  commentsController.addComment
);

router.get(
  "/destroyComment/:id",
  passport.checkAuthentication,
  commentsController.destroyComment
);

module.exports = router;

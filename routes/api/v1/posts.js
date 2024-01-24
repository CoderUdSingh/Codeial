const express = require("express");
const passport = require("passport");
const router = express.Router();
const postsApiControllers = require("../../../controllers/api/v1/posts_api");

router.get("/", postsApiControllers.index);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsApiControllers.destroy
);

module.exports = router;

const express = require("express");
const postController = require("../controllers/posts_controllers");
const router = express.Router();

router.post("/create", postController.createPost);

module.exports = router;

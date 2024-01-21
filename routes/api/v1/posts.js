const express = require("express");
const router = express.Router();
const postsApiControllers = require("../../../controllers/api/v1/posts_api");

router.get("/", postsApiControllers.index);

module.exports = router;

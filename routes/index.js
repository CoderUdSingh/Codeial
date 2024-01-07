const express = require("express");
const homeController = require("../controllers/home_controllers");
const router = express.Router();

console.log("Home Router is loaded");

router.get("/", homeController.home);

router.use("/users", require("./user_route"));
router.use("/posts", require("./posts_route"));

module.exports = router;

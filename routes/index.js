const express = require("express");
const homeController = require("../controllers/home_controllers");
const router = express.Router();

console.log("Router is loaded");

router.get("/", homeController.home);
router.use("/users", require("./user_route"));

module.exports = router;

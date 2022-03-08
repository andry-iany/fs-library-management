const { users: usersController } = require("../controllers");
const express = require("express");
const router = express.Router();

router.route("/register").post(usersController.register);

module.exports = router;

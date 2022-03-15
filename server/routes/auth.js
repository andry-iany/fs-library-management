const { auth: authController } = require("../controllers");
const { checkRequiredProps } = require("../middlewares");
const express = require("express");

const router = express.Router();

router
	.route("/login")
	.post(checkRequiredProps("email", "password"))
	.post(authController.loginController);

module.exports = router;

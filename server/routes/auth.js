const { auth: authController } = require("../controllers");
const { validateRequest } = require("../middlewares");
const express = require("express");

const router = express.Router();

router
	.route("/login")
	.post(validateRequest("email", "password"))
	.post(authController.loginController);

module.exports = router;

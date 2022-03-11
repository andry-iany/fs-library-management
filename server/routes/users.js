const { users: usersController } = require("../controllers");
const { validateRequest } = require("../middlewares");
const express = require("express");
const router = express.Router();

router.route("/").get(usersController.getAllUsers);

router
	.route("/register")
	.post(validateRequest("nom", "dateDeNaissance", "adresse", "CIN"))
	.post(usersController.register);

module.exports = router;

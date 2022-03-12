const { users: usersController } = require("../controllers");
const { validateRequest, authenticate, authorize } = require("../middlewares");
const express = require("express");

const router = express.Router();

router.use(authenticate(), authorize("librarian"));

router.route("/").get(usersController.getAllUsers);

router
	.route("/register")
	.post(validateRequest("nom", "dateDeNaissance", "adresse", "CIN"))
	.post(usersController.register);

module.exports = router;

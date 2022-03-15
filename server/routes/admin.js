const { admin: adminController } = require("../controllers");
const {
	authenticate,
	authorize,
	checkRequiredProps,
} = require("../middlewares");
const express = require("express");

const router = express.Router();

router.use(authenticate(), authorize("manager"));

router.route("/").get(adminController.getAllAdmins);

router.route("/detail/:adminId").get(adminController.getAdmin);

router.route("/edit/:adminId").put(adminController.editAdmin);

router.route("/delete/:adminId").delete(adminController.deleteAdmin);

router
	.route("/register")
	.post(checkRequiredProps("nom", "password", "role", "email"))
	.post(adminController.register);

module.exports = router;

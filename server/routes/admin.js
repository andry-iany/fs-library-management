const { admin: adminController } = require("../controllers");
const { authenticate, authorize } = require("../middlewares");
const express = require("express");

const router = express.Router();

router.use(authenticate(), authorize("manager"));

router.route("/").get(adminController.getAllAdmins);

module.exports = router;

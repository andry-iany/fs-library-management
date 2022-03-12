const { rental: rentalController } = require("../controllers");
const { validateRequest, authenticate, authorize } = require("../middlewares");
const express = require("express");
const router = express.Router();

router.use(authenticate(), authorize("librarian"));

router.route("/").get(rentalController.getAllRentals);

router.route("/:userId").get(rentalController.getRentalByUserId);

router
	.route("/rent")
	.post(validateRequest("userId", "ISBN"))
	.post(rentalController.rentBook);

router
	.route("/return")
	.post(validateRequest("userId", "ISBN"))
	.post(rentalController.returnBook);

module.exports = router;

const { rental: rentalController } = require("../controllers");
const {
	checkRequiredProps,
	authenticate,
	authorize,
} = require("../middlewares");
const express = require("express");
const router = express.Router();

router.use(authenticate(), authorize("librarian"));

router.route("/").get(rentalController.getAllRentals);

router.route("/:userId").get(rentalController.getRentalByUserId);

router
	.route("/rent")
	.post(checkRequiredProps("userId", "ISBN"))
	.post(rentalController.rentBook);

router
	.route("/return")
	.post(checkRequiredProps("userId", "ISBN"))
	.post(rentalController.returnBook);

module.exports = router;

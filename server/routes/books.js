const { books: booksController } = require("../controllers");
const { validateRequest, authenticate, authorize } = require("../middlewares");
const express = require("express");

const router = express.Router();

router.use(authenticate(), authorize("librarian"));

router.route("/").get(booksController.getAllBooks);

router
	.route("/add")
	.post(validateRequest("nom", "categorie", "ISBN"))
	.post(booksController.addBook);

module.exports = router;

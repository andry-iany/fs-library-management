const { books: booksController } = require("../controllers");
const { validateRequest } = require("../middlewares");
const express = require("express");

const router = express.Router();

router.route("/").get(booksController.getBooks);

router
	.route("/add")
	.post(validateRequest("nom", "categorie", "ISBN"))
	.post(booksController.addBook);

module.exports = router;

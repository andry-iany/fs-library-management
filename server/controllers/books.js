const { Book } = require("../models");
const { handleGetWithOptionalPagination } = require("./_shared");
const { formatResponse, ErrorResponse } = require("../utils");

exports.getAllBooks = function (req, res) {
	req.queryDBArgs = {
		Model: Book,
		filter: {},
	};
	return handleGetWithOptionalPagination(req, res);
};

exports.addBook = async function (req, res, next) {
	const existingBook = await Book.findOne({ ISBN: req.validBody.ISBN });
	if (existingBook) {
		const message = `Un livre ayant ISBN:${req.validBody.ISBN} existe dejà.`;
		return next(new ErrorResponse(message, 400));
	}

	const book = new Book(req.validBody);
	try {
		const savedBook = await book.save();
		res.status(201).json(formatResponse.forSuccess(savedBook));
	} catch (err) {
		return next(err);
	}
};

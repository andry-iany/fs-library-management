const { Book } = require("../models");
const { formatResponse, ErrorResponse } = require("../utils");

const formatResponseSuccess = formatResponse.formatResponseSuccess;

async function getBooks(req, res, next) {
	const books = await Book.find({});
	res.status(200).json(formatResponseSuccess(books));
}

async function addBook(req, res, next) {
	const existingBook = await Book.findOne({ ISBN: req.validBody.ISBN });
	if (existingBook) {
		const message = `Un livre ayant ISBN:${req.validBody.ISBN} existe dejà.`;
		return next(new ErrorResponse(message, 400));
	}

	const book = new Book(req.validBody);
	const savedBook = await book.save();
	res.status(201).json(formatResponseSuccess(savedBook));
}

module.exports = { addBook, getBooks };

const { Book } = require("../models");
const { formatResponse, paginationUtils, ErrorResponse } = require("../utils");

const { getPageAndLimitIfValid, getMaxPage } = paginationUtils;
const { formatResponseSuccess, formatResponseSuccessWithPagination } =
	formatResponse;

async function getAllBooks(req, res) {
	const pageAndLimit = getPageAndLimitIfValid(req.query);
	if (pageAndLimit) {
		await getAllBooksPaginated(res, pageAndLimit);
	} else {
		await getAllBooksNonPaginated(res);
	}
}

async function getAllBooksPaginated(res, { _page, _limit }) {
	const admins = await Book.find({})
		.skip((_page - 1) * _limit)
		.limit(_limit);

	const docsCount = await Book.countDocuments();
	res
		.status(200)
		.json(
			formatResponseSuccessWithPagination(
				admins,
				_page,
				getMaxPage(docsCount, _limit)
			)
		);
}

async function getAllBooksNonPaginated(res) {
	const admins = await Book.find({});
	res.status(200).json(formatResponseSuccess(admins));
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

module.exports = { addBook, getAllBooks };

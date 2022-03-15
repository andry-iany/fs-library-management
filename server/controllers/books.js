const { Book } = require("../models");
const { formatResponse, paginationUtils, ErrorResponse } = require("../utils");

const { getPageAndLimitIfValid, getMaxPage } = paginationUtils;
const { forSuccess, forSuccessWithPagination } = formatResponse;

exports.getAllBooks = async function (req, res) {
	const pageAndLimit = getPageAndLimitIfValid(req.query);
	if (pageAndLimit) {
		await _getAllBooksPaginated(res, pageAndLimit);
	} else {
		await _getAllBooksNonPaginated(res);
	}
};

async function _getAllBooksPaginated(res, { _page, _limit }) {
	const admins = await Book.find({})
		.skip((_page - 1) * _limit)
		.limit(_limit);

	const docsCount = await Book.countDocuments();
	res
		.status(200)
		.json(
			forSuccessWithPagination(admins, _page, getMaxPage(docsCount, _limit))
		);
}

async function _getAllBooksNonPaginated(res) {
	const admins = await Book.find({});
	res.status(200).json(forSuccess(admins));
}

exports.addBook = async function (req, res, next) {
	const existingBook = await Book.findOne({ ISBN: req.validBody.ISBN });
	if (existingBook) {
		const message = `Un livre ayant ISBN:${req.validBody.ISBN} existe dejà.`;
		return next(new ErrorResponse(message, 400));
	}

	const book = new Book(req.validBody);
	const savedBook = await book.save();
	res.status(201).json(forSuccess(savedBook));
};

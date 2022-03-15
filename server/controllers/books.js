const { Book } = require("../models");
const {
	dbUtils,
	formatResponse,
	paginationUtils,
	ErrorResponse,
} = require("../utils");

exports.getAllBooks = async function (req, res) {
	let resBody;

	const pageAndLimit = paginationUtils.getPageAndLimitIfValid(req.query);
	const result = await dbUtils.queryDB(Book, {}, pageAndLimit);

	resBody = pageAndLimit
		? formatResponse.forSuccessWithPagination(result)
		: formatResponse.forSuccess(result);

	res.status(200).json(resBody);
};

exports.addBook = async function (req, res, next) {
	const existingBook = await Book.findOne({ ISBN: req.validBody.ISBN });
	if (existingBook) {
		const message = `Un livre ayant ISBN:${req.validBody.ISBN} existe dejà.`;
		return next(new ErrorResponse(message, 400));
	}

	const book = new Book(req.validBody);
	const savedBook = await book.save();
	res.status(201).json(formatResponse.forSuccess(savedBook));
};

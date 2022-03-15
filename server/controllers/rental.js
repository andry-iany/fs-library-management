const mongoose = require("mongoose");
const { Book, Rental, User } = require("../models");
const { handleGetWithOptionalPagination } = require("./_shared");
const { formatResponse, ErrorResponse } = require("../utils");

exports.getAllRentals = async function (req, res, next) {
	req.queryDBArgs = {
		Model: Rental,
		filter: {},
	};
	return handleGetWithOptionalPagination(req, res);
};

exports.getRentalByUserId = async function (req, res, next) {
	const userId = req.params.userId;
	let rental = null;

	if (mongoose.isValidObjectId(userId)) {
		rental = await Rental.findOne({ userId });
	}

	return res.status(200).json(formatResponse.forSuccess(rental));
};

exports.returnBook = async function (req, res, next) {
	if (!mongoose.isValidObjectId(req.validBody.userId))
		return next(new ErrorResponse("L'utilisateur spécifié n'existe pas.", 400));

	let rental = await Rental.findOne({
		userId: req.validBody.userId,
	});

	if (!rental)
		return next(new ErrorResponse("Aucun emprunt correspondant.", 400));

	_removeBooksFromRental(rental, req.validBody.ISBN);

	if (rental.ISBN.length === 0) {
		await Rental.deleteOne({ _id: rental.id });
		rental = null;
	} else {
		await rental.save();
	}

	res.status(200).json(formatResponse.forSuccess(rental));
};

function _removeBooksFromRental(rental, booksToRemove = []) {
	const booksInRental = [...rental.ISBN];

	for (let bookToRemove of booksToRemove) {
		const index = booksInRental.findIndex((book) => book === bookToRemove);
		if (index >= 0) booksInRental.splice(index, 1);
	}

	rental.ISBN = booksInRental;
}

exports.rentBook = async function (req, res, next) {
	try {
		await _verifyIfRentingUserExists(req.validBody.userId);
		await _verifyIfBooksAreAvailable(req.validBody.ISBN);

		let newRental = null;
		const existingRental = await Rental.findOne({
			userId: req.validBody.userId,
		});

		if (existingRental) {
			newRental = existingRental;
			newRental.ISBN.push(...req.validBody.ISBN);
		} else {
			newRental = new Rental({
				userId: req.validBody.userId,
				ISBN: req.validBody.ISBN,
				rentedOn: new Date(),
			});
		}

		const savedRental = await newRental.save();
		return res.status(200).json(formatResponse.forSuccess(savedRental));
	} catch (err) {
		// mongoose validation error
		if (err.errors) return next(err);
		else return next(new ErrorResponse(err.message, 400));
	}
};

async function _verifyIfRentingUserExists(userId) {
	if (!mongoose.isValidObjectId(userId))
		throw new Error("L'utilisateur spécifié n'existe pas.");

	const userRenting = await User.findById(userId);
	if (!userRenting) throw new Error("L'utilisateur spécifié n'existe pas.");
}

async function _verifyIfBooksAreAvailable(ISBNs) {
	const existBooks = await Book.contains(...ISBNs);
	if (!existBooks)
		throw new Error("Le(s) livre(s) specifié(s) n'existe(nt) pas.");
}

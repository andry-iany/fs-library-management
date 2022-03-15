const { Book, Rental } = require("../models");
const { formatResponse, ErrorResponse, paginationUtils } = require("../utils");
const mongoose = require("mongoose");

const { getPageAndLimitIfValid, getMaxPage } = paginationUtils;
const { forSuccess, forSuccessWithPagination } = formatResponse;

exports.getAllRentals = async function (req, res, next) {
	let rentals = null;

	const pageAndLimit = getPageAndLimitIfValid(req.query);
	if (pageAndLimit) {
		rentals = await Rental.find({})
			.skip((pageAndLimit._page - 1) * pageAndLimit._limit)
			.limit(pageAndLimit._limit);

		const docsCount = await Rental.countDocuments();
		res
			.status(200)
			.json(
				forSuccessWithPagination(
					rentals,
					pageAndLimit._page,
					getMaxPage(docsCount, pageAndLimit._limit)
				)
			);
	} else {
		rentals = await Rental.find({});
		res.status(200).json(forSuccess(rentals));
	}
};

exports.getRentalByUserId = async function (req, res, next) {
	const userId = req.params.userId;
	let rental = null;

	if (mongoose.isValidObjectId(userId)) {
		rental = await Rental.findOne({ userId });
	}

	return res.status(200).json(forSuccess(rental));
};

exports.returnBook = async function (req, res, next) {
	if (!mongoose.isValidObjectId(req.validBody.userId))
		return next(new ErrorResponse("L'utilisateur spécifié n'existe pas.", 400));

	let rental = await Rental.findOne({
		userId: req.validBody.userId,
	});

	if (!rental)
		return next(new ErrorResponse("Aucun emprunt correspondant.", 400));

	const ISBNsToReturn = [...req.validBody.ISBN];
	const ISBNsInRental = [...rental.ISBN];

	ISBNsToReturn.forEach((ISBN) => {
		const index = ISBNsInRental.findIndex((book) => book === ISBN);
		if (index >= 0) ISBNsInRental.splice(index, 1);
	});

	rental.ISBN = ISBNsInRental;

	if (rental.ISBN.length === 0) {
		await Rental.deleteOne({ _id: rental.id });
		rental = null;
	} else {
		await rental.save();
	}

	res.status(200).json(forSuccess(rental));
};

exports.rentBook = async function (req, res, next) {
	try {
		if (!mongoose.isValidObjectId(req.validBody.userId))
			throw new Error("L'utilisateur spécifié n'existe pas.", 400);

		await _verifyIfBooksAreAvailable(req.validBody.ISBN);

		const existingRental = await Rental.findOne({
			userId: req.validBody.userId,
		});
		let newRental = null;

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

		await _validateRental(newRental);

		const savedRental = await newRental.save();
		return res.status(200).json(forSuccess(savedRental));
	} catch (err) {
		return next(new ErrorResponse(err.message, 400));
	}
};

async function _verifyIfBooksAreAvailable(ISBNs) {
	const existBooks = await Book.contains(...ISBNs);
	if (!existBooks)
		throw new Error("Le(s) livre(s) specifié(s) n'existe(nt) pas.");
}

async function _validateRental(rental) {
	try {
		await Rental.validate(rental);
	} catch (err) {
		const errMessage = Object.keys(err.errors).reduce((acc, curr) => {
			return (acc += `${err.errors[curr].properties.message}. `);
		}, "");
		throw new Error(errMessage);
	}
}

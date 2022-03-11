const { Book, Rental } = require("../models");
const { formatResponse, ErrorResponse } = require("../utils");
const mongoose = require("mongoose");

const { formatResponseSuccess, formatResponseSuccessWithPagination } =
	formatResponse;

function getPageAndLimitIfValid(req) {
	const { _limit, _page } = req.query;
	if (!isNaN(parseInt(_limit)) && !isNaN(parseInt(_page))) {
		return { _limit: parseInt(_limit), _page: parseInt(_page) };
	}
	return null;
}

function getMaxPage(docsCount, limit) {
	return Math.ceil(docsCount / limit);
}

async function getAllRentals(req, res, next) {
	let rentals = null;

	const pageAndLimit = getPageAndLimitIfValid(req);
	if (pageAndLimit) {
		rentals = await Rental.find({})
			.skip((pageAndLimit._page - 1) * pageAndLimit._limit)
			.limit(pageAndLimit._limit);

		const docsCount = await Rental.countDocuments();
		res
			.status(200)
			.json(
				formatResponseSuccessWithPagination(
					rentals,
					pageAndLimit._page,
					getMaxPage(docsCount, pageAndLimit._limit)
				)
			);
	} else {
		rentals = await Rental.find({});
		res.status(200).json(formatResponseSuccess(rentals));
	}
}

async function getRentalByUserId(req, res, next) {
	const userId = req.params.userId;
	let rental = null;

	if (mongoose.isValidObjectId(userId)) {
		rental = await Rental.findOne({ userId });
	}

	return res.status(200).json(formatResponseSuccess(rental));
}

async function rentBook(req, res, next) {
	try {
		if (!mongoose.isValidObjectId(req.validBody.userId))
			return next(
				new ErrorResponse("L'utilisateur spécifié n'existe pas.", 400)
			);

		await verifyIfBooksAreAvailable(req.validBody.ISBN);

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

		await Rental.validate(newRental);
		const savedRental = await newRental.save();
		return res.status(200).json(formatResponseSuccess(savedRental));
	} catch (err) {
		console.log(err.message);
		return next(new ErrorResponse(err.message, 400));
	}
}

async function verifyIfBooksAreAvailable(ISBNs) {
	const existBooks = await Book.contains(...ISBNs);
	if (!existBooks)
		throw new Error("Le(s) livre(s) specifié(s) n'existe(nt) pas.");
}

async function returnBook(req, res, next) {
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

	res.status(200).json(formatResponseSuccess(rental));
}

module.exports = { getRentalByUserId, getAllRentals, rentBook, returnBook };

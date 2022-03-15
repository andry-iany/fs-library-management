const mongoose = require("mongoose");
const MAX_ALLOWED_TO_RENT = 3;

const RentalSchema = new mongoose.Schema({
	userId: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "User",
		required: "L'ID du membre est nécessaire",
		validate: {
			validator: _validateUserId,
		},
	},
	ISBN: {
		type: [String],
		required: true,
		validate: {
			validator: _validateISBN,
		},
	},
	rentedOn: {
		type: Date,
		required: true,
	},
});

async function _validateUserId(value) {
	if (!mongoose.isValidObjectId(value)) return false;

	const User = require("./User");
	const user = await User.findById(value);
	if (!user) throw new Error("L'utilisateur spécifié n'existe pas");

	return true;
}

async function _validateISBN(value) {
	const checkSync = [
		Array.isArray(value),
		value.length > 0,
		value.length <= MAX_ALLOWED_TO_RENT,
	];

	if (checkSync.some((check) => !check))
		throw new Error(
			`On peut emprunter seulement 1 à ${MAX_ALLOWED_TO_RENT} livres`
		);

	const Book = require("./Book");
	const existBooks = await Book.contains(...value);
	if (!existBooks)
		throw new Error("Le(s) livre(s) specifié(s) n'existe(nt) pas");

	return true;
}

RentalSchema.statics.MAX_ALLOWED_TO_RENT = MAX_ALLOWED_TO_RENT;

const Rental = mongoose.model("Rental", RentalSchema);

module.exports = Rental;

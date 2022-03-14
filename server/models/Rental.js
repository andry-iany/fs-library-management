const mongoose = require("mongoose");
const MAX_ALLOWED_TO_RENT = 3;

const RentalSchema = new mongoose.Schema({
	userId: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "User",
		required: "L'ID du membre est nécessaire",
	},
	ISBN: {
		type: [String],
		required: true,
		validate: {
			validator: function (value) {
				return (
					Array.isArray(value) &&
					value.length > 0 &&
					value.length <= MAX_ALLOWED_TO_RENT
				);
			},
			message: `On peut emprunter seulement 1 à ${MAX_ALLOWED_TO_RENT} livres`,
		},
	},
	rentedOn: {
		type: Date,
		required: true,
	},
});

RentalSchema.statics.MAX_ALLOWED_TO_RENT = MAX_ALLOWED_TO_RENT;

RentalSchema.methods.isValid = function () {
	return (
		mongoose.isValidObjectId(this.userId) &&
		this.bookIds.length <= RentalSchema.MAX_ALLOWED_TO_RENT &&
		this.bookIds.every((bookId) => mongoose.isValidObjectId(bookId))
	);
};

const Rental = mongoose.model("Rental", RentalSchema);

module.exports = Rental;

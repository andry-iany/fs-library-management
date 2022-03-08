const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
	nom: {
		type: String,
		required: true,
	},
	categorie: {
		type: String,
		required: true,
	},
	quantite: {
		type: Number,
		required: true,
	},
	ISBN: {
		type: String,
		required: true,
		unique: true,
	},
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;

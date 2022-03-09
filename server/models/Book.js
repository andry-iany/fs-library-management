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
	ISBN: {
		type: String,
		required: true,
		unique: true,
	},
});

BookSchema.statics.contains = async function (...ISBNs) {
	const searchedBooks = await Book.find({ ISBN: { $in: [...ISBNs] } });
	return ISBNs.every((ISBN) => {
		return searchedBooks.some((book) => book.ISBN === ISBN);
	});
};

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;

const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
	logement: String,
	commune: String,
	ville: String,
});

const UserSchema = new mongoose.Schema({
	nom: String,
	dateDeNaissance: Date,
	adresse: AddressSchema,
	CIN: {
		type: Number,
		validate: {
			validator: (value) => String(value).length === 12,
			message: "Donnée invalide",
		},
		required: true,
		unique: true,
		select: false,
	},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

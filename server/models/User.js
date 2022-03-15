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
		type: String,
		validate: {
			validator: (value) => {
				return String(value).length === 12 && !isNaN(Number(value));
			},
			message: "CIN invalide",
		},
		required: true,
		unique: true,
		select: false,
	},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

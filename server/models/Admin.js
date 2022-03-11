const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
	nom: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		select: false,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	role: {
		type: String,
		enum: ["librarian", "manager"],
		default: "librarian",
	},
});

AdminSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

AdminSchema.methods.matchPasswords = function (password) {
	return bcrypt.compare(password, this.password);
};

AdminSchema.methods.getSignedToken = function () {
	return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;

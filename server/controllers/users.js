const { formatResponse } = require("../utils");
const User = require("../models/User");

const formatResponseSuccess = formatResponse.formatResponseSuccess;

async function register(req, res, next) {
	const user = new User({
		...req.validBody,
		dateDeNaissance: new Date(req.validBody.dateDeNaissance),
	});

	try {
		const savedUser = await user.save();
		return res.status(201).json(formatResponseSuccess(savedUser));
	} catch (err) {
		return next(err);
	}
}

module.exports = { register };

const User = require("../models/User");
const { handleGetWithOptionalPagination } = require("./_shared");
const { formatResponse, ErrorResponse } = require("../utils");

exports.getAllUsers = async function (req, res) {
	req.queryDBArgs = {
		Model: User,
		filter: {},
	};
	return handleGetWithOptionalPagination(req, res);
};

exports.register = async function (req, res, next) {
	const userExist = await User.findOne({ CIN: req.validBody.CIN });
	if (userExist)
		return next(new ErrorResponse("L'utilisateur est dejà membre.", 400));

	const user = new User({
		...req.validBody,
		dateDeNaissance: new Date(req.validBody.dateDeNaissance),
	});

	try {
		const savedUser = await user.save();
		return res.status(201).json(formatResponse.forSuccess(savedUser));
	} catch (err) {
		return next(err);
	}
};

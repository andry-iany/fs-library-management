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
	const CIN = Number(req.validBody.CIN);

	if (isNaN(CIN)) return next(new ErrorResponse("Donnée invalide.", 400));

	const userExist = await User.findOne({ CIN });
	if (userExist)
		return next(new ErrorResponse("L'utilisateur est dejà membre.", 400));

	const user = new User({
		...req.validBody,
		dateDeNaissance: new Date(req.validBody.dateDeNaissance),
		CIN,
	});

	try {
		const savedUser = await user.save();
		return res.status(201).json(formatResponse.forSuccess(savedUser));
	} catch (err) {
		return next(err);
	}
};

const { formatResponse, ErrorResponse, paginationUtils } = require("../utils");
const User = require("../models/User");

const { getPageAndLimitIfValid, getMaxPage } = paginationUtils;
const { formatResponseSuccess, formatResponseSuccessWithPagination } =
	formatResponse;

async function getAllUsers(req, res) {
	const pageAndLimit = getPageAndLimitIfValid(req.query);
	if (pageAndLimit) {
		await getAllUsersPaginated(res, pageAndLimit);
	} else {
		await getAllUsersNonPaginated(res);
	}
}
async function getAllUsersPaginated(res, { _page, _limit }) {
	const users = await User.find({})
		.skip((_page - 1) * _limit)
		.limit(_limit);

	const docsCount = await User.countDocuments();
	res
		.status(200)
		.json(
			formatResponseSuccessWithPagination(
				users,
				_page,
				getMaxPage(docsCount, _limit)
			)
		);
}
async function getAllUsersNonPaginated(res) {
	const users = await User.find({});
	res.status(200).json(formatResponseSuccess(users));
}

async function register(req, res, next) {
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
		return res.status(201).json(formatResponseSuccess(savedUser));
	} catch (err) {
		return next(err);
	}
}

module.exports = { getAllUsers, register };

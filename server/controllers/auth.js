const { Admin } = require("../models");
const { ErrorResponse, formatResponse } = require("../utils");

exports.loginController = async function (req, res, next) {
	const admin = await Admin.findOne({ email: req.validBody.email }).select(
		"+password"
	);
	if (!admin)
		return next(new ErrorResponse("Email ou mot de passe incorrect.", 404));

	const isMatch = await admin.matchPasswords(req.validBody.password);
	if (!isMatch)
		return next(new ErrorResponse("Email ou mot de passe incorrect.", 404));

	const token = admin.getSignedToken();

	return res
		.status(200)
		.json(formatResponse.forSuccess({ token, role: admin.role }));
};

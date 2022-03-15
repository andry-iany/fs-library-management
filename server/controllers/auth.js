const { Admin } = require("../models");
const { ErrorResponse, formatResponse } = require("../utils");

const forSuccess = formatResponse.forSuccess;

exports.loginController = async function (req, res, next) {
	try {
		const admin = await Admin.findOne({ email: req.validBody.email }).select(
			"+password"
		);

		if (!admin)
			return next(new ErrorResponse("Email ou mot de passe incorrect.", 404));

		const isMatch = await admin.matchPasswords(req.validBody.password);

		if (!isMatch)
			return next(new ErrorResponse("Email ou mot de passe incorrect.", 404));

		return sendToken(admin, 200, res);
	} catch (err) {
		return next(err);
	}
};

const sendToken = (admin, statusCode, res) => {
	const token = admin.getSignedToken();
	return res.status(statusCode).json(forSuccess({ token, role: admin.role }));
};

const { ErrorResponse } = require("../utils");
const jwt = require("jsonwebtoken");

module.exports = function authenticate() {
	return (req, res, next) => {
		const token = getTokenFromHeaders(req.headers);
		if (!token) return next(new ErrorResponse("Non autorisé.", 401));

		try {
			const admin = jwt.verify(token, process.env.JWT_SECRET);
			req.admin = admin;
			next();
		} catch (err) {
			return next(new ErrorResponse("Non autorisé.", 401));
		}
	};
};

function getTokenFromHeaders(headers) {
	return headers.authorization?.split(" ")[1];
}

const { ErrorResponse } = require("../utils");

// this middleware is meant to be placed after authenticate middleware
module.exports = function authorize(...roles) {
	return (req, res, next) => {
		if (roles.length === 0) next();
		for (let role of roles) {
			if (req.admin.role === role) {
				console.log(role);
				return next();
			}
		}
		return next(
			new ErrorResponse(
				"Vous n'avez pas le privilège d'acceder ce chemin.",
				403
			)
		);
	};
};

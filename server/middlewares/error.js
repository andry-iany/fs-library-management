const { ErrorResponse, formatResponse } = require("../utils");

module.exports = function handleError(err, req, res, next) {
	let error;

	if (err instanceof ErrorResponse) {
		error = err;
	} else if (err.name === "ValidationError") {
		// mongoose validation error
		const errorMessage = _getValidationErrorMessage(err);
		error = new ErrorResponse(errorMessage, 400);
	} else {
		error = new ErrorResponse("Une erreur s'est produite.", 500);
	}

	res.status(error.statusCode).json(formatResponse.forError(error.message));
};

function _getValidationErrorMessage(error) {
	return Object.keys(error.errors).reduce((acc, curr) => {
		return (acc += `${error.errors[curr].properties.message}. `);
	}, "");
}
